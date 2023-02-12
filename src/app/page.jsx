'use client'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import HeartCard from '@/components/HeartCard'
import styles from '@/styles/pages/Home.module.scss'
import { getHomeTitle, getNotes } from 'lib/functions'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })



export default function Home() {
  const [notes, setNotes] = useState(null);
  const [title, setTitle] = useState('Loading...');

  async function getServerData() {
    const _notes = await getNotes();
    const _title = await getHomeTitle();
    setNotes(_notes);
    setTitle(_title.greeting);
  }

  useEffect(() => {
    getServerData();
  }, [])
  
  return (
    <main className={styles.main}>
      <h1>{title}</h1>
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