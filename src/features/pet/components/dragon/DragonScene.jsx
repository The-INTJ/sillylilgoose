'use client';

import { useState, useCallback } from 'react';
import styles from './DragonScene.module.scss';

export default function DragonScene({ petName, ownerName }) {
  const [rolling, setRolling] = useState(false);
  const [showWhee, setShowWhee] = useState(false);

  const handleClick = useCallback(() => {
    if (rolling) return;
    setRolling(true);
    setShowWhee(true);

    // Reset roll after animation completes
    setTimeout(() => setRolling(false), 1200);
    // Fade out text
    setTimeout(() => setShowWhee(false), 2000);
  }, [rolling]);

  return (
    <div className={styles.scene}>
      <div className={styles.nameTag}>{petName}</div>

      <div
        className={`${styles.dragon} ${rolling ? styles.roll : styles.wander}`}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      >
        🐉
      </div>

      {showWhee && (
        <div className={styles.speechBubble}>wheeee!</div>
      )}

      <p className={styles.idleMessage}>
        {petName} loves being with you, {ownerName}!
      </p>
    </div>
  );
}
