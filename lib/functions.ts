import { firestore } from './firebase';

import { collection, getDocs } from "firebase/firestore";

export async function getNotes () {
    const noteCollection = collection(firestore, "notes");
    const noteCollSnap = await getDocs(noteCollection);
    let notes = [];
    noteCollSnap.forEach((doc) => {
        notes.push(doc.data());
    })
    console.log(notes)
    return notes;
}
