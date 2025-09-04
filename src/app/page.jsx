'use client'
import { Inter } from 'next/font/google'
import NoteCard from '@/components/NoteCard'
import styles from '@/styles/pages/home/Home.module.scss'
import { getTitle, getNotes } from 'lib/functions'
import { useCachedData} from 'lib/hooks'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })



export default function Home() {
  const [currentNotes, setCurrentNotes] = useState(null);
  const [oldNotes, setOldNotes] = useState(null);
  const [title, setTitle] = useState('Loading...');
  const [epoch, setEpoch] = useState(Math.round(Date.now() / 1000));
  const [expanded, setExpanded] = useState(false);

  const getServerData = async () => {
    const _notes = await getNotes();
    const _title = await getTitle('home');
    let old = [];
    let curr = [];
    for (let i = 0; i < _notes.length; i++) {
      _notes[i].date.seconds < epoch ? old.push(_notes[i]) : curr.push(_notes[i]);
    }
    return { curr, old, _title };
  };

  const data = useCachedData('homeData', getServerData);

  useEffect(() => {
    if (data) {
      setCurrentNotes(data.curr);
      setOldNotes(data.old);
      setTitle(data._title);
    }
  }, [data]);

  return (
    <main className={styles.main}>
      <h1>{title}</h1>
      {currentNotes ? currentNotes.map((note, index) => {
        return <NoteCard
          key={index}
          priority={true}
          placeholder='blur'
          note={note.note}
          altText=''
          stacked={note.date.seconds < epoch} />
      }) : <p>looooooading...</p>}
      <hr />
      <button className={styles.oldNotes} onClick={() => setExpanded(!expanded)}>
        {oldNotes ? oldNotes.map((note, index) => {
          return <NoteCard
            key={index}
            priority={true}
            placeholder='blur'
            note={note.note}
            altText=''
            stacked={note.date.seconds < epoch}
            expanded={expanded} />
        }) : <p>looooooading...</p>}
      </button>
    </main>
  )
}