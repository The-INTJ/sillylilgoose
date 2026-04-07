'use client';

import { useState, useEffect } from 'react';

// ─── Message pools per scene ──────────────────────────────────────────────────
// Voice rules: first person, lowercase, soft & cute. See VOICE.md.
const MESSAGES = {
  mainScreenIdle: [
    "i'm so happy you're here",
    "wanna go on an adventure?",
    "you're my favorite",
    "i've been thinking about you",
    "let's do something fun",
    "*happy dragon noises*",
    "i missed you!",
    "today feels like a good day",
    "stay forever? 🐉",
  ],
};

const GREETING_DELAY_MS = 2_000;
const ROTATE_INTERVAL_MS = 30_000;

function pickRandom(pool, exclude) {
  const candidates = exclude != null ? pool.filter((m) => m !== exclude) : pool;
  if (candidates.length === 0) return pool[0] ?? '';
  return candidates[Math.floor(Math.random() * candidates.length)];
}

/**
 * Renders a rotating pet message for a given scene.
 *
 * Props:
 *   scene        {string} - message pool key, e.g. 'mainScreenIdle'  (required)
 *   useTimePassed {bool}  - when true, opens with "{ownerName}!!!" then
 *                           rotates through idle messages              (optional)
 *   ownerName    {string} - player name for the greeting               (optional)
 *   className    {string} - forwarded to the wrapping <p>              (optional)
 */
export default function PetMessageRotator({
  scene,
  useTimePassed = false,
  ownerName,
  className,
}) {
  const pool = MESSAGES[scene] ?? [];

  const greeting = ownerName ? `${ownerName}!!!` : '!!!';

  const [message, setMessage] = useState(() =>
    useTimePassed ? greeting : pickRandom(pool)
  );

  useEffect(() => {
    if (!useTimePassed || pool.length === 0) return;

    // Reset to greeting whenever ownerName changes (e.g. first load)
    setMessage(ownerName ? `${ownerName}!!!` : '!!!');

    let intervalId;

    const greetingTimer = setTimeout(() => {
      const first = pickRandom(pool);
      setMessage(first);

      intervalId = setInterval(() => {
        setMessage((prev) => pickRandom(pool, prev));
      }, ROTATE_INTERVAL_MS);
    }, GREETING_DELAY_MS);

    return () => {
      clearTimeout(greetingTimer);
      clearInterval(intervalId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useTimePassed, ownerName]);

  return <p className={className}>{message}</p>;
}
