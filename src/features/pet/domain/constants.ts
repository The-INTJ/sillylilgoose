// Set NEXT_PUBLIC_PET_DEV=true in .env.local to use dev timing + separate Firestore doc.
// Defaults to false (production) when unset.
export const IS_PET_DEV =
  process.env.NEXT_PUBLIC_PET_DEV === 'true';

// Timing
export const FEED_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes
export const DEV_FEED_INTERVAL_MS = 10 * 1000;  // 10 seconds for testing
export const POLL_INTERVAL_MS = 10 * 1000;      // re-derive state every 10s (prod)
export const DEV_POLL_INTERVAL_MS = 2 * 1000;   // 2 seconds in dev

export function getPollInterval(): number {
  return IS_PET_DEV ? DEV_POLL_INTERVAL_MS : POLL_INTERVAL_MS;
}

export const FEEDS_TO_HATCH = 3;

// Firestore paths — dev writes to a separate doc so you never stomp production data
export const PET_COLLECTION = 'pets';
export const PET_DOC_PROD = 'current';
export const PET_DOC_DEV = 'dev';
export const PET_DOC = IS_PET_DEV ? PET_DOC_DEV : PET_DOC_PROD;

export function getFeedInterval(): number {
  return IS_PET_DEV ? DEV_FEED_INTERVAL_MS : FEED_INTERVAL_MS;
}
