import { firestore } from './firebase';

import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { getAuth, } from "firebase/auth";

export async function getNotes() {
    const noteCollection = collection(firestore, "notes");
    const noteCollSnap = await getDocs(noteCollection);
    let notes = [];
    noteCollSnap.forEach((doc) => {
        notes.push(doc.data());
    })
    return notes;
}

export async function getTitle(req: string) {
    req = req ? req : 'error';
    const docRef = doc(firestore, "titles", req);
    const docSnap = await getDoc(docRef);
    let title: string;
    if (docSnap.exists()) {
        title = docSnap.data().greeting;
    } else {
        console.log("No such document!");
    }
    return title;
}

export async function getHomeTitle() {
    const docRef = doc(firestore, "titles", "home");
    const docSnap = await getDoc(docRef);
    let title;
    if (docSnap.exists()) {
        title = docSnap.data();
    } else {
        console.log("No such document!");
    }
    return title;
}

export async function getInfoTitle() {
    const docRef = doc(firestore, "titles", "info");
    const docSnap = await getDoc(docRef);
    let title;
    if (docSnap.exists()) {
        title = docSnap.data();
    } else {
        console.log("No such document!");
    }
    return title;
}

export async function getInfo() {
    const docRef = doc(firestore, "info", "plans");
    const docSnap = await getDoc(docRef);
    let plans;
    if (docSnap.exists()) {
        plans = docSnap.data();
    } else {
        console.log("No such document!");
    }
    return plans;
}