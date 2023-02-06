import styles from "@/styles/components/Frog.module.scss";

const Frog = (props) => {
    let tongue;
    if (props.activateTongue) {
        tongue = <div className={styles.tongue} />
    } else {
        tongue = null;
    }
  return (
    <div class={styles.container}>
      <div class={styles.legL}></div>
      <div class={styles.legR}></div>
      <div class={styles.body}></div>
      <div class={styles.face}>
        <div class={styles.eyes}></div>
        {tongue}
      </div>
    </div>
  );
};

export default Frog;
