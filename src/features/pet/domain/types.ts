import { Timestamp } from 'firebase/firestore';

// ── Firestore document shape ──────────────────────────────────────────

export type PetStage = 'egg' | 'hatched';

export interface PetData {
  stage: PetStage;
  createdAt: Timestamp;
  feedTimes: Timestamp[];
  hatchedAt: Timestamp | null;
  petName: string | null;
  ownerName: string | null;
}

// ── Derived UI state (computed, never stored) ─────────────────────────

export type PetVisualStage =
  | 'egg_idle'
  | 'egg_needs_feeding'
  | 'ready_to_hatch'
  | 'hatching'
  | 'hatched';

export interface DerivedPetState {
  visualStage: PetVisualStage;
  canFeed: boolean;
  feedingsCompleted: number;
  feedingsRemaining: number;
  msUntilCanFeed: number;
  petName: string | null;
  ownerName: string | null;
}

// ── Action signatures (consumed by provider, exposed via context) ─────

export interface PetActions {
  feed: () => Promise<void>;
  hatch: (petName: string, ownerName: string) => Promise<void>;
  initialize: () => Promise<void>;
}
