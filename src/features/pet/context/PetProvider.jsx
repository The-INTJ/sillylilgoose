'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { PetContext } from './PetContext';
import { derivePetState } from '../domain/petStateMachine';
import { POLL_INTERVAL_MS } from '../domain/constants';
import {
  getPetData,
  initializeEgg,
  feedFire,
  completeHatch,
  getPetStorageMode,
} from '../data/petFirestore';

export default function PetProvider({ children }) {
  const [petData, setPetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [storageMode, setStorageMode] = useState('firestore');
  const mountedRef = useRef(true);
  const [, setTick] = useState(0);

  const syncStorageMode = useCallback(() => {
    setStorageMode(getPetStorageMode());
  }, []);

  const handleError = useCallback((nextError) => {
    console.error('Pet experience failed to sync.', nextError);
    if (!mountedRef.current) return false;
    setError('The dragon could not sync right now.');
    syncStorageMode();
    return false;
  }, [syncStorageMode]);

  const fetchData = useCallback(async () => {
    const data = await getPetData();
    if (!mountedRef.current) return data;
    setPetData(data);
    setError(null);
    syncStorageMode();
    return data;
  }, [syncStorageMode]);

  useEffect(() => {
    mountedRef.current = true;
    let ignore = false;

    async function init() {
      try {
        let data = await fetchData();
        if (ignore) return;

        if (!data) {
          await initializeEgg();
          syncStorageMode();
          data = await fetchData();
          if (ignore) return;
        }
      } catch (nextError) {
        if (!ignore) {
          handleError(nextError);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    void init();

    return () => {
      ignore = true;
      mountedRef.current = false;
    };
  }, [fetchData, handleError, syncStorageMode]);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const feed = useCallback(async () => {
    try {
      await feedFire();
      syncStorageMode();
      await fetchData();
      return true;
    } catch (nextError) {
      return handleError(nextError);
    }
  }, [fetchData, handleError, syncStorageMode]);

  const hatch = useCallback(
    async (petName, ownerName) => {
      try {
        await completeHatch(petName, ownerName);
        syncStorageMode();
        await fetchData();
        return true;
      } catch (nextError) {
        return handleError(nextError);
      }
    },
    [fetchData, handleError, syncStorageMode]
  );

  const initialize = useCallback(async () => {
    try {
      await initializeEgg();
      syncStorageMode();
      await fetchData();
      return true;
    } catch (nextError) {
      return handleError(nextError);
    }
  }, [fetchData, handleError, syncStorageMode]);

  const state = derivePetState(petData, new Date());

  return (
    <PetContext.Provider
      value={{
        state,
        actions: { feed, hatch, initialize },
        loading,
        error,
        storageMode,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
