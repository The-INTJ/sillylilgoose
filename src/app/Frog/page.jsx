'use client'
import Frog from "@/components/Frog";
import styles from "@/styles/pages/frog/Frog.module.scss";
import { getTitle } from "@lib/functions";
import { useState } from "react";
import { useCachedData } from "lib/hooks";

const createFrogConfig = () => ({
  orientation: Math.random(),
  moves: Math.random() > 0.5,
});

const getServerData = async () => {
  const _title = await getTitle('frog');
  return { _title };
};

const FrogPage = () => {
  const [frogConfigs, setFrogConfigs] = useState(() => [createFrogConfig()]);

  const data = useCachedData('frogData', getServerData);
  const title = data?._title ?? 'Loading...';

  return (
    <div className={styles.main}>
      <h1>{title}</h1>
      <button
        className={styles.frogContainer}
        onClick={() => setFrogConfigs((currentFrogs) => [...currentFrogs, createFrogConfig()])}
      >
        <Frog key="static-frog" />
        {frogConfigs.map((frogConfig, index) => (
          <Frog
            key={`dynamic-frog-${index}`}
            activateTongue={true}
            orientation={frogConfig.orientation}
            moves={frogConfig.moves}
          />
        ))}
      </button>
    </div>
  )
}

export default FrogPage;