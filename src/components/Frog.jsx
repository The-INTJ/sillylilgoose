import styles from "@/styles/components/Frog/Frog.module.scss";
import { useState, useEffect } from "react";

const Frog = (props) => {

  let tongue;
  if (props.activateTongue) {
    tongue = <div className={styles.tongue} />
  } else {
    tongue = null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.legL}></div>
      <div className={styles.legR}></div>
      <div className={styles.body}></div>
      <div className={styles.face}>
        <div className={styles.eyes}></div>
        {tongue}
      </div>
    </div>
  );
};

export default Frog;
