'use client';

import styles from './WoodStack.module.scss';

export default function WoodStack({ canFeed }) {
  const handleDragStart = (e) => {
    if (!canFeed) { e.preventDefault(); return; }
    e.dataTransfer.setData('text/plain', 'wood');
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className={`${styles.stack}${canFeed ? ` ${styles.active}` : ''}`}>
      {/* Row 3 — bottom: 3 logs */}
      <div className={styles.row}>
        <span className={styles.log} draggable onDragStart={handleDragStart}>🪵</span>
        <span className={styles.log} draggable onDragStart={handleDragStart}>🪵</span>
        <span className={styles.log} draggable onDragStart={handleDragStart}>🪵</span>
      </div>
      {/* Row 2 — middle: 2 logs */}
      <div className={styles.row}>
        <span className={styles.log} draggable onDragStart={handleDragStart}>🪵</span>
        <span className={styles.log} draggable onDragStart={handleDragStart}>🪵</span>
      </div>
      {/* Row 1 — top: 1 log */}
      <div className={styles.row}>
        <span className={styles.log} draggable onDragStart={handleDragStart}>🪵</span>
      </div>
      <p className={styles.label}>{canFeed ? 'drag to fire ↓' : 'wood pile'}</p>
    </div>
  );
}
