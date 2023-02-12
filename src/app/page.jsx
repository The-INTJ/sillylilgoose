'use client'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import HeartCard from '@/components/HeartCard'
import styles from '@/styles/pages/Home.module.scss'
import { getNotes } from 'lib/functions'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })



export default function Home() {
  const [notes, setNotes] = useState(null);

  async function getNotesWrapper() {
    const res = await getNotes();
    console.log(res);
    setNotes(res);
  }

  useEffect(() => {
    getNotesWrapper();
  }, [])
  
  return (
    <main className={styles.main}>
      <h1>TBD</h1>
      {notes ? notes.map((note, index) => {
        return <HeartCard
          key={index}
          priority={true}
          placeholder='blur'
          note={note.note}
          altText='' />
      }) : <p>looooooading...</p>}
    </main>
  )
}