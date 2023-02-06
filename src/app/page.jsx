import Image from 'next/image'
import { Inter } from '@next/font/google'
import HeartCard from '@/components/HeartCard'
import styles from '@/styles/pages/Home.module.scss'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>TBD</h1>
      <HeartCard 
        note='DESCRIPTION DESCRIPTION text text and text and text and text and textDESCRIPTION DESCRIPTION text text and text and text and text and textDESCRIPTION DESCRIPTION text text and text and text and text and text'/>
      <p style={{marginTop:1000 + 'px'}}>YEEEEE</p>
    </main>
  )
}
