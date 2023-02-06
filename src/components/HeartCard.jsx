import styles from "../styles/components/HeartCard.module.scss";
import Image from "next/image";
import img from "/public/heart-dark.png";

const HeartCard = (props) => {
  return (
    <div className={styles.heart}>
      <p className={styles.note}>{props.note}</p>
        <div className={styles.imageContainer}>
          <Image src={img} alt={props.altText} />
        </div>
    </div>
  );
};

export default HeartCard;
