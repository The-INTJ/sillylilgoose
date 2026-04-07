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

      try {
        const didHatch = await onHatch(petName.trim(), playerName.trim());
        if (didHatch) {
          setStep(STEPS.CELEBRATION);
        }
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div className={styles.sequence}>
      {step === STEPS.CRACKING && (
        <div className={styles.cracking} onAnimationEnd={handleCrackDone}>
          <div className={styles.crackingEgg}>{'\u{1F95A}'}</div>
          <p className={styles.crackText}>...something is happening...</p>
        </div>
      )}

      {step === STEPS.ASK_PLAYER_NAME && (
        <div className={styles.step}>
          <div className={styles.hatchingEgg}>{'\u{1F423}'}</div>
          <p className={styles.prompt}>...hi?</p>
          <p className={styles.prompt}>what's your name...?</p>
          <form onSubmit={handlePlayerNameSubmit} className={styles.inputForm}>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className={styles.nameInput}
              placeholder="your name..."
              autoFocus
              maxLength={30}
            />
            <button type="submit" className={styles.submitButton} disabled={!playerName.trim()}>
              tell me!
            </button>
          </form>
        </div>
      )}

      {step === STEPS.ASK_PET_NAME && (
        <div className={styles.step}>
          <div className={styles.babyDragon}>{'\u{1F409}'}</div>
          <p className={styles.prompt}>yayyy!</p>
          <p className={styles.prompt}>can i have a name?</p>
          <form onSubmit={handlePetNameSubmit} className={styles.inputForm}>
            <input
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              className={styles.nameInput}
              placeholder="dragon name..."
              autoFocus
              maxLength={30}
            />
            <button
              type="submit"
              className={styles.submitButton}
              disabled={!petName.trim() || submitting}
            >
              {submitting ? 'thinking...' : 'name me!'}
            </button>
          </form>
        </div>
      )}

      {step === STEPS.CELEBRATION && (
        <div className={styles.celebration}>
          <div className={styles.rollingDragon}>{'\u{1F409}'}</div>
          <p className={styles.celebrationText}>
            yay!! i love my name. you're my favorite person, {playerName}! 💕
          </p>
          <div className={styles.sparkles}>{'\u2728\u{1F389}\u2728'}</div>
        </div>
      )}
    </div>
  );
}
