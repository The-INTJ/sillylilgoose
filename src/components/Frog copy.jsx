import styles from "@/styles/components/Frog.module.scss";
import { useState, useEffect } from "react";

const Frog = (props) => {

  const [movement, setMovement] = useState([0, 0]);

  useEffect(() => {
    if (props.moves) {
      setInterval(() => {
        setMovement(movement[0] + 10, movement[1] + 10);
      }, 1500);
    }
  }, [])

  let tongue;
  if (props.activateTongue) {
    tongue = <div className={styles.tongue} />
  } else {
    tongue = null;
  }

  function orientation() {
    let orient = '0deg';
    if (props.orientation) {
      orient = Math.floor(props.orientation * 360 + 1) + 'deg';
    }
    return orient;
  }

  return (
    <div className={styles.container} style={{ top: movement[0], right: movement[1] }}>
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
