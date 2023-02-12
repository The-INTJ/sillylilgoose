'use client'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import HeartCard from '@/components/HeartCard'
import styles from '@/styles/pages/Home.module.scss'
import { getNotes } from 'lib/functions'

const inter = Inter({ subsets: ['latin'] })

export default async function TestPage() {
    const notes = await getNotes();
  return (
    <main className={styles.main}>
      <h1>TBD</h1>
      <button onClick={() => getNotes()}>sigh</button>
      {console.log("notes" + props.notes)}
      { notes ? notes.map((note, index) => {
        <HeartCard
          key={index}
          priority={true}
          placeholder='blur'
          note={note.note}
          altText='' />
      }) : null}
    </main>
  )
}