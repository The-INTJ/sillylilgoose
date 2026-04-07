import type { PetData, DerivedPetState, PetVisualStage } from './types';
import { FEEDS_TO_HATCH, getFeedInterval } from './constants';

/**
 * Pure function: derives the full UI state from persisted data + current time.
 * No side effects, no Firebase imports, no React imports.
 */
export function derivePetState(
  data: PetData | null,
  now: Date
): DerivedPetState {
  // No data yet — treat as brand-new egg waiting to be initialized
  if (!data) {
    return {
      visualStage: 'egg_idle',
      canFeed: false,
      feedingsCompleted: 0,
      feedingsRemaining: FEEDS_TO_HATCH,
      msUntilCanFeed: 0,
      petName: null,
      ownerName: null,
    };
  }

  const feedingsCompleted = data.feedTimes.length;
  const feedingsRemaining = Math.max(0, FEEDS_TO_HATCH - feedingsCompleted);

  // ── Already hatched ──
  if (data.stage === 'hatched') {
    const needsNaming = !data.petName || !data.ownerName;
    return {
      visualStage: needsNaming ? 'hatching' : 'hatched',
      canFeed: false,
      feedingsCompleted,
      feedingsRemaining: 0,
      msUntilCanFeed: 0,
      petName: data.petName,
      ownerName: data.ownerName,
    };
  }

  // ── Egg stage ──
  const feedInterval = getFeedInterval();
  const nowMs = now.getTime();

  // Reference point: last feed time, or createdAt if never fed
  const lastEventMs =
    feedingsCompleted > 0
      ? data.feedTimes[feedingsCompleted - 1].toMillis()
      : data.createdAt.toMillis();

  const elapsed = nowMs - lastEventMs;
  const msUntilCanFeed = Math.max(0, feedInterval - elapsed);
  const timeReady = elapsed >= feedInterval;

  // All feedings done → ready to hatch
  if (feedingsRemaining === 0) {
    return {
      visualStage: 'ready_to_hatch',
      canFeed: false,
      feedingsCompleted,
      feedingsRemaining: 0,
      msUntilCanFeed: 0,
      petName: null,
      ownerName: null,
    };
  }

  // Can feed right now
  if (timeReady) {
    return {
      visualStage: 'egg_needs_feeding',
      canFeed: true,
      feedingsCompleted,
      feedingsRemaining,
      msUntilCanFeed: 0,
      petName: null,
      ownerName: null,
    };
  }

  // Still waiting
  return {
    visualStage: 'egg_idle',
    canFeed: false,
    feedingsCompleted,
    feedingsRemaining,
    msUntilCanFeed,
    petName: null,
    ownerName: null,
  };
}
