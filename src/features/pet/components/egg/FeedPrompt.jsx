'use client';

import { useState } from 'react';
import styles from './FeedPrompt.module.scss';

export default function FeedPrompt({ onFeed }) {
  const [feeding, setFeeding] = useState(false);

  const handleFeed = async () => {
    setFeeding(true);

    try {
      await onFeed();
    } finally {
      setFeeding(false);
    }
  };

  return (
    <div className={styles.prompt}>
      <p className={styles.message}>
        The fire is getting low... add some branches?
      </p>
      <button
        className={styles.feedButton}
        onClick={handleFeed}
        disabled={feeding}
      >
        {feeding ? 'Adding...' : 'Add branches'}
      </button>
    </div>
  );
}
