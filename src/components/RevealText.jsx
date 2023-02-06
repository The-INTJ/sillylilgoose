import styles from "@/styles/components/RevealText.module.scss";

const RevealText = (props) => {
    let content;
    if (props.activateText) {
        content = <p className={styles.text}>{props.text}</p>
    } else {
        content = null;
    }
    return (
        <div>
            {content}
        </div>
    );
};

export default RevealText;
