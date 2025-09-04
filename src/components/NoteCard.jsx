import styles from "../styles/components/NoteCard/NoteCard.module.scss";
import Image from "next/image";
import img from "/public/pumpkin.png";

const NoteCard = (props) => {
  let computedImage = props.imgOverride ? props.imgOverride : img;
  return (
    props.stacked ?
      <div className={styles.spoopy}>
        <div className={styles.stacked + ' ' + (props.expanded ? (styles.noHeight) : '')}>
          <p className={styles.note}>{props.note}</p>
          <div className={styles.imageContainer}>
            <Image src={computedImage} alt={props.altText} priority />
          </div>
        </div>
      </div>
      :
      <div className={styles.spoopy}>
        <div className={styles.heart}>
          <p className={styles.note}>{props.note}</p>
          <div className={styles.imageContainer}>
            <Image src={computedImage} alt={props.altText} priority />
          </div>
        </div>
      </div>
  );
};

export default NoteCard;
