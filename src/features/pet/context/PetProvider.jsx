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
} from '../data/petFirestore';

export default function PetProvider({ children }) {
  const [petData, setPetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(true);
  const [tick, setTick] = useState(0);

  // ── Fetch pet data from Firestore ───────────────────────────────────
  const fetchData = useCallback(async () => {
    const data = await getPetData();
    if (!mountedRef.current) return data;
    setPetData(data);
    return data;
  }, []);

  // ── Initial load: fetch or create egg ───────────────────────────────
  useEffect(() => {
    mountedRef.current = true;
    let ignore = false;

    async function init() {
      let data = await getPetData();
      if (ignore) return;

      if (!data) {
        await initializeEgg();
        data = await getPetData();
        if (ignore) return;
      }

      setPetData(data);
      setLoading(false);
    }

    init();

    return () => {
      ignore = true;
      mountedRef.current = false;
    };
  }, []);

  // ── Poll to re-derive state (for countdown timers) ─────────────────
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  // ── Actions ─────────────────────────────────────────────────────────
  const feed = useCallback(async () => {
    await feedFire();
    await fetchData();
  }, [fetchData]);

  const hatch = useCallback(
    async (petName, ownerName) => {
      await completeHatch(petName, ownerName);
      await fetchData();
    },
    [fetchData]
  );

  const initialize = useCallback(async () => {
    await initializeEgg();
    await fetchData();
  }, [fetchData]);

  // ── Derive state from data + current time ───────────────────────────
  // `tick` is in the dependency list so state re-derives on each poll
  const state = derivePetState(petData, new Date());

  return (
    <PetContext.Provider value={{ state, actions: { feed, hatch, initialize }, loading }}>
      {children}
    </PetContext.Provider>
  );
}
