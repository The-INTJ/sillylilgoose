'use client';

import { useState } from 'react';
import styles from './HatchSequence.module.scss';

const STEPS = {
  CRACKING: 'cracking',
  ASK_PLAYER_NAME: 'askPlayerName',
  ASK_PET_NAME: 'askPetName',
  CELEBRATION: 'celebration',
};

export default function HatchSequence({ onHatch }) {
  const [step, setStep] = useState(STEPS.CRACKING);
  const [playerName, setPlayerName] = useState('');
  const [petName, setPetName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Auto-advance from cracking to first prompt after animation
  const handleCrackDone = () => setStep(STEPS.ASK_PLAYER_NAME);

  const handlePlayerNameSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      setStep(STEPS.ASK_PET_NAME);
    }
  };

  const handlePetNameSubmit = async (e) => {
    e.preventDefault();
    if (petName.trim()) {
      setSubmitting(true);
      await onHatch(petName.trim(), playerName.trim());
      setSubmitting(false);
      setStep(STEPS.CELEBRATION);
    }
  };

  return (
    <div className={styles.sequence}>
      {step === STEPS.CRACKING && (
        <div className={styles.cracking} onAnimationEnd={handleCrackDone}>
          <div className={styles.crackingEgg}>🥚</div>
          <p className={styles.crackText}>Something is happening...</p>
        </div>
      )}

      {step === STEPS.ASK_PLAYER_NAME && (
        <div className={styles.step}>
          <div className={styles.hatchingEgg}>🐣</div>
          <p className={styles.prompt}>A tiny dragon peers up at you curiously...</p>
          <p className={styles.prompt}>What is your name?</p>
          <form onSubmit={handlePlayerNameSubmit} className={styles.inputForm}>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className={styles.nameInput}
              placeholder="Your name..."
              autoFocus
              maxLength={30}
            />
            <button type="submit" className={styles.submitButton} disabled={!playerName.trim()}>
              Tell them
            </button>
          </form>
        </div>
      )}

      {step === STEPS.ASK_PET_NAME && (
        <div className={styles.step}>
          <div className={styles.babyDragon}>🐉</div>
          <p className={styles.prompt}>The little dragon chirps happily!</p>
          <p className={styles.prompt}>What would you like to name your dragon?</p>
          <form onSubmit={handlePetNameSubmit} className={styles.inputForm}>
            <input
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              className={styles.nameInput}
              placeholder="Dragon name..."
              autoFocus
              maxLength={30}
            />
            <button
              type="submit"
              className={styles.submitButton}
              disabled={!petName.trim() || submitting}
            >
              {submitting ? 'Naming...' : 'Name them!'}
            </button>
          </form>
        </div>
      )}

      {step === STEPS.CELEBRATION && (
        <div className={styles.celebration}>
          <div className={styles.rollingDragon}>🐉</div>
          <p className={styles.celebrationText}>
            Yay!!! I love my name. You are now my favorite person, {playerName}!
          </p>
          <div className={styles.sparkles}>✨🎉✨</div>
        </div>
      )}
    </div>
  );
}
