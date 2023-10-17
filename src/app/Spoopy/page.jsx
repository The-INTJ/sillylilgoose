'use client'
import styles from "@/styles/pages/spoopy/Spoopy.module.scss";
import Image from "next/image";
import img from "/public/ghostie.png";


const SpoopyPage = () => {
  return (
    <div className={styles.spoopy}>
      <Image className={styles.ghostie} src={img} />
      <h1>and more is Coming soOoOoOoOn</h1>
      <h2>(very spoopy)</h2>
    </div>
  )
}

export default SpoopyPage;