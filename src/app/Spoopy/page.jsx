'use client'
import styles from "@/styles/pages/spoopy/Spoopy.module.scss";
import Image from "next/image";
import img from "/public/ghostie.png";
import NoteCard from '@/components/NoteCard';
import spider from '/public/spider.png';
import Link from 'next/link';


const SpoopyPage = () => {
  return (
    <div className={styles.spoopy}>
      <Image className={styles.ghostie} src={img} alt="ghostie" />
      <h1>and more is Coming soOoOoOoOn</h1>
      <h2>(very spoopy)</h2>
      <Link 
        className={styles.spiderLink}
        href="/Spoopy/Spider">
        <Image src={spider} alt="spider" />
      </Link>
    </div>
  )
}

export default SpoopyPage;