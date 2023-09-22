import styles from "@/styles/components/RevealText/RevealText.module.scss";

const RevealText = (props) => {
    let content;
    if (props.activateText) {
        content = (
            <div className={styles.textCont}>
                <p className={styles.textLabel}>{props.labelText}:</p>
                <p className={styles.text}> {props.descText}</p>
            </div>
        )
    } else {
        content = null;
    }
    return (
        <div className={styles.revealCont}>
            {content}
        </div>
    );
};

export default RevealText;
