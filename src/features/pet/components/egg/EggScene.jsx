'use client';

import { useState } from 'react';
import styles from './EggScene.module.scss';

export default function EggScene({ feedingsCompleted, canFeed, onFeed }) {
  const [isDragOver, setIsDragOver] = useState(false);

  // Fire intensity grows with feedings
  const fireClass =
    feedingsCompleted >= 2
      ? styles.fireLarge
      : feedingsCompleted >= 1
        ? styles.fireMedium
        : styles.fireSmall;

  const handleDragOver = (e) => {
    if (!canFeed) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (!canFeed) return;
    if (e.dataTransfer.getData('text/plain') === 'wood') {
      onFeed?.();
    }
  };

  // Also allow a tap on the fire when canFeed (for mobile / accessibility)
  const handleFireClick = () => {
    if (canFeed) onFeed?.();
  };

  return (
    <div className={styles.scene}>
      {canFeed && (
        <div className={styles.speechBubble}>
          more wood please! 🍂
        </div>
      )}

      <div className={styles.eggWrapper}>
        <div className={styles.egg}>🥚</div>
      </div>

      <div
        className={`${styles.fire} ${fireClass}${isDragOver ? ` ${styles.dropActive}` : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleFireClick}
        role={canFeed ? 'button' : undefined}
        aria-label={canFeed ? 'Feed the fire' : undefined}
        style={{ cursor: canFeed ? 'pointer' : 'default' }}
      >
        <div className={styles.flames}>
          <span className={styles.flame1}>🔥</span>
          <span className={styles.flame2}>🔥</span>
          <span className={styles.flame3}>🔥</span>
        </div>
        <div className={styles.logs}>🪵🪵</div>
      </div>
    </div>
  );
}
