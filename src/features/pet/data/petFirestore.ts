import { FirebaseError } from 'firebase/app';
import { firestore } from '@lib/firebase';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { PET_COLLECTION, PET_DOC } from '../domain/constants';
import type { PetData } from '../domain/types';

const petDocRef = () => doc(firestore, PET_COLLECTION, PET_DOC);
const LOCAL_STORAGE_KEY = `pet-state:${PET_DOC}`;

type PetStorageMode = 'firestore' | 'local';

interface LocalPetData {
  stage: PetData['stage'];
  createdAtMs: number;
  feedTimesMs: number[];
  hatchedAtMs: number | null;
  petName: string | null;
  ownerName: string | null;
}

let lastPetStorageMode: PetStorageMode = 'firestore';

function setPetStorageMode(mode: PetStorageMode) {
  lastPetStorageMode = mode;
}

export function getPetStorageMode(): PetStorageMode {
  return lastPetStorageMode;
}

function isPermissionDenied(error: unknown): boolean {
  if (error instanceof FirebaseError) {
    return error.code === 'permission-denied';
  }

  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 'permission-denied'
  );
}

function canUseLocalStorage(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function createLocalEggData(): PetData {
  const now = Timestamp.now();

  return {
    stage: 'egg',
    createdAt: now,
    feedTimes: [],
    hatchedAt: null,
    petName: null,
    ownerName: null,
  };
}

function toLocalPetData(data: PetData): LocalPetData {
  return {
    stage: data.stage,
    createdAtMs: data.createdAt.toMillis(),
    feedTimesMs: data.feedTimes.map((time) => time.toMillis()),
    hatchedAtMs: data.hatchedAt ? data.hatchedAt.toMillis() : null,
    petName: data.petName,
    ownerName: data.ownerName,
  };
}

function fromLocalPetData(raw: LocalPetData): PetData {
  return {
    stage: raw.stage,
    createdAt: Timestamp.fromMillis(raw.createdAtMs),
    feedTimes: raw.feedTimesMs.map((time) => Timestamp.fromMillis(time)),
    hatchedAt: raw.hatchedAtMs ? Timestamp.fromMillis(raw.hatchedAtMs) : null,
    petName: raw.petName ?? null,
    ownerName: raw.ownerName ?? null,
  };
}

function readLocalPetData(): PetData | null {
  if (!canUseLocalStorage()) return null;

  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return null;
    return fromLocalPetData(JSON.parse(raw) as LocalPetData);
  } catch {
    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
    return null;
  }
}

function writeLocalPetData(data: PetData): PetData {
  if (canUseLocalStorage()) {
    window.localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(toLocalPetData(data))
    );
  }

  return data;
}

function updateLocalPetData(updater: (current: PetData) => PetData): PetData {
  const current = readLocalPetData() ?? createLocalEggData();
  return writeLocalPetData(updater(current));
}

export async function getPetData(): Promise<PetData | null> {
  try {
    const snap = await getDoc(petDocRef());

    if (!snap.exists()) {
      // Firestore doc is missing – check if a previous write fell back to localStorage
      const localData = readLocalPetData();
      if (localData) {
        setPetStorageMode('local');
        return localData;
      }
      setPetStorageMode('firestore');
      return null;
    }

    setPetStorageMode('firestore');

    const raw = snap.data();
    return {
      stage: raw.stage,
      createdAt: raw.createdAt as Timestamp,
      feedTimes: (raw.feedTimes ?? []) as Timestamp[],
      hatchedAt: raw.hatchedAt ?? null,
      petName: raw.petName ?? null,
      ownerName: raw.ownerName ?? null,
    } satisfies PetData;
  } catch (error) {
    if (!isPermissionDenied(error)) {
      throw error;
    }

    setPetStorageMode('local');
    return readLocalPetData();
  }
}

export async function initializeEgg(): Promise<void> {
  try {
    await setDoc(petDocRef(), {
      stage: 'egg',
      createdAt: serverTimestamp(),
      feedTimes: [],
      hatchedAt: null,
      petName: null,
      ownerName: null,
    });
    setPetStorageMode('firestore');
  } catch (error) {
    if (!isPermissionDenied(error)) {
      throw error;
    }

    setPetStorageMode('local');
    writeLocalPetData(createLocalEggData());
  }
}

export async function feedFire(): Promise<void> {
  try {
    await updateDoc(petDocRef(), {
      feedTimes: arrayUnion(Timestamp.now()),
    });
    setPetStorageMode('firestore');
  } catch (error) {
    if (!isPermissionDenied(error)) {
      throw error;
    }

    setPetStorageMode('local');
    updateLocalPetData((current) => ({
      ...current,
      feedTimes: [...current.feedTimes, Timestamp.now()],
    }));
  }
}

export async function completeHatch(
  petName: string,
  ownerName: string
): Promise<void> {
  try {
    await updateDoc(petDocRef(), {
      stage: 'hatched',
      hatchedAt: serverTimestamp(),
      petName,
      ownerName,
    });
    setPetStorageMode('firestore');
  } catch (error) {
    if (!isPermissionDenied(error)) {
      throw error;
    }

    setPetStorageMode('local');
    updateLocalPetData((current) => ({
      ...current,
      stage: 'hatched',
      hatchedAt: Timestamp.now(),
      petName,
      ownerName,
    }));
  }
}
