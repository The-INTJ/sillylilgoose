import { createContext, useContext } from 'react';
import type { DerivedPetState, PetActions } from '../domain/types';

export type PetStorageMode = 'firestore' | 'local';

export interface PetContextValue {
  state: DerivedPetState;
  actions: PetActions;
  loading: boolean;
  error: string | null;
  storageMode: PetStorageMode;
}

export const PetContext = createContext<PetContextValue | null>(null);

export function usePet(): PetContextValue {
  const ctx = useContext(PetContext);
  if (!ctx) {
    throw new Error('usePet must be used within a PetProvider');
  }
  return ctx;
}
