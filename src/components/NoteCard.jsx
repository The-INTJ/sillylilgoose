'use client'
import styles from "../styles/components/NoteCard/NoteCard.module.scss";
import Image from "next/image";
import pumpkinImage from "/public/pumpkin.png";
import { useTheme } from "@lib/ThemeContext";

const NoteCard = (props) => {
  const { metadata } = useTheme();
  const showImageArt = Boolean(props.imgOverride) || metadata.noteCardArt.kind === 'image';
  const artAltText =
    props.altText || (props.imgOverride ? 'note art' : metadata.noteCardArt.label);

  const cardClassName = [
    props.stacked ? styles.stacked : styles.card,
    props.expanded ? styles.expanded : '',
    props.stacked && metadata.hideStackedNoteUntilExpanded ? styles.hideCollapsedText : '',
  ]
    .filter(Boolean)
    .join(' ');

  const artContainerClassName = [
    styles.artContainer,
    showImageArt ? styles.halloweenArt : styles.springArt,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div>
      <div className={cardClassName}>
        <p className={styles.note}>{props.note}</p>
        {showImageArt ? (
          <div className={artContainerClassName}>
            <Image
              className={styles.artImage}
              src={props.imgOverride || pumpkinImage}
              alt={artAltText}
              priority
            />
          </div>
        ) : (
          <div className={artContainerClassName}>
            <span
              className={`${styles.symbolArt} material-symbols-outlined`}
              role="img"
              aria-label={artAltText}
            >
              {metadata.noteCardArt.value}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteCard;
