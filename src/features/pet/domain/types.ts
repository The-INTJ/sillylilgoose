import { Timestamp } from 'firebase/firestore';

export type PetStage = 'egg' | 'hatched';

export interface PetData {
  stage: PetStage;
  createdAt: Timestamp;
  feedTimes: Timestamp[];
  hatchedAt: Timestamp | null;
  petName: string | null;
  ownerName: string | null;
}

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

export interface PetActions {
  feed: () => Promise<boolean>;
  hatch: (petName: string, ownerName: string) => Promise<boolean>;
  initialize: () => Promise<boolean>;
}
