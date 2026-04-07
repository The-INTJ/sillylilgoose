'use client';

import styles from './EggScene.module.scss';

export default function EggScene({ feedingsCompleted }) {
  // Fire intensity grows with feedings
  const fireClass =
    feedingsCompleted >= 2
      ? styles.fireLarge
      : feedingsCompleted >= 1
        ? styles.fireMedium
        : styles.fireSmall;

  return (
    <div className={styles.scene}>
      <div className={styles.eggWrapper}>
        <div className={styles.egg}>🥚</div>
      </div>

      <div className={`${styles.fire} ${fireClass}`}>
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
