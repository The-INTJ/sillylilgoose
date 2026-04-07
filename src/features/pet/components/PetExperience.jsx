'use client';

import { usePet } from '@/features/pet';
import { IS_PET_DEV } from '../domain/constants';
import EggScene from './egg/EggScene';
import FeedPrompt from './egg/FeedPrompt';
import HatchSequence from './hatch/HatchSequence';
import DragonScene from './dragon/DragonScene';
import styles from './PetExperience.module.scss';

export default function PetExperience() {
  const { state, actions, loading } = usePet();

  if (loading) {
    return (
      <div className={styles.container}>
        <p className={styles.loading}>✨</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {IS_PET_DEV && (
        <button className={styles.devReset} onClick={actions.initialize}>
          ↺
        </button>
      )}
      {/* ── Egg stages ─────────────────────────────────────── */}
      {(state.visualStage === 'egg_idle' ||
        state.visualStage === 'egg_needs_feeding') && (
        <div className={styles.eggArea}>
          <EggScene feedingsCompleted={state.feedingsCompleted} />

          {state.canFeed ? (
            <FeedPrompt onFeed={actions.feed} />
          ) : (
            <p className={styles.waitMessage}>
              The egg sits quietly by the warm fire...
            </p>
          )}

          <p className={styles.feedCount}>
            🪵 {state.feedingsCompleted} / 3 feedings
          </p>
        </div>
      )}

      {/* ── Ready to hatch / hatching (naming flow) ──────── */}
      {(state.visualStage === 'ready_to_hatch' ||
        state.visualStage === 'hatching') && (
        <HatchSequence onHatch={actions.hatch} />
      )}

      {/* ── Fully hatched dragon ─────────────────────────── */}
      {state.visualStage === 'hatched' && (
        <DragonScene
          petName={state.petName}
          ownerName={state.ownerName}
        />
      )}
    </div>
  );
}
