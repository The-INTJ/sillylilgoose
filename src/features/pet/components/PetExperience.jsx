'use client';

import { usePet } from '@/features/pet';
import { IS_PET_DEV } from '../domain/constants';
import EggScene from './egg/EggScene';
import WoodStack from './egg/WoodStack';
import HatchSequence from './hatch/HatchSequence';
import DragonScene from './dragon/DragonScene';
import styles from './PetExperience.module.scss';

function formatMs(ms) {
  if (ms <= 0) return '0s';
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
}

export default function PetExperience() {
  const { state, actions, loading, error, storageMode } = usePet();

  if (loading) {
    return (
      <div className={styles.container}>
        <p className={styles.loading}>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {IS_PET_DEV && storageMode === 'local' && (
        <p className={styles.notice}>
          Pet progress is being saved on this device while Firebase access is blocked.
        </p>
      )}

      {error && <p className={styles.error}>{error}</p>}

      {IS_PET_DEV && (
        <button className={styles.devReset} onClick={actions.initialize}>
          Reset
        </button>
      )}

      {(state.visualStage === 'egg_idle' ||
        state.visualStage === 'egg_needs_feeding') && (
        <div className={styles.eggArea}>
          {IS_PET_DEV && (
            state.canFeed ? (
              <p className={styles.timer}>ready! 🔥</p>
            ) : state.msUntilCanFeed > 0 ? (
              <p className={styles.timer}>
                back in {formatMs(state.msUntilCanFeed)} 🌙
              </p>
            ) : null
          )}
          <div className={styles.sceneRow}>
            <EggScene
              feedingsCompleted={state.feedingsCompleted}
              canFeed={state.canFeed}
              onFeed={actions.feed}
            />
            <WoodStack canFeed={state.canFeed} />
          </div>

          {!state.canFeed && (
            <p className={styles.waitMessage}>
              ...warm...
            </p>
          )}

          <p className={styles.feedCount}>
            fed: {state.feedingsCompleted} / 3
          </p>
        </div>
      )}

      {(state.visualStage === 'ready_to_hatch' ||
        state.visualStage === 'hatching') && (
        <HatchSequence onHatch={actions.hatch} />
      )}

      {state.visualStage === 'hatched' && (
        <DragonScene
          petName={state.petName}
          ownerName={state.ownerName}
        />
      )}
    </div>
  );
}
