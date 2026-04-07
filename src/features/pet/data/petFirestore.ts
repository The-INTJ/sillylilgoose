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

export async function getPetData(): Promise<PetData | null> {
  const snap = await getDoc(petDocRef());
  if (!snap.exists()) return null;

  const raw = snap.data();
  return {
    stage: raw.stage,
    createdAt: raw.createdAt as Timestamp,
    feedTimes: (raw.feedTimes ?? []) as Timestamp[],
    hatchedAt: raw.hatchedAt ?? null,
    petName: raw.petName ?? null,
    ownerName: raw.ownerName ?? null,
  } satisfies PetData;
}

export async function initializeEgg(): Promise<void> {
  await setDoc(petDocRef(), {
    stage: 'egg',
    createdAt: serverTimestamp(),
    feedTimes: [],
    hatchedAt: null,
    petName: null,
    ownerName: null,
  });
}

export async function feedFire(): Promise<void> {
  await updateDoc(petDocRef(), {
    feedTimes: arrayUnion(Timestamp.now()),
  });
}

export async function completeHatch(
  petName: string,
  ownerName: string
): Promise<void> {
  await updateDoc(petDocRef(), {
    stage: 'hatched',
    hatchedAt: serverTimestamp(),
    petName,
    ownerName,
  });
}
