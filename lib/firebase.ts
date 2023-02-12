import { initializeApp, getApp } from "firebase/app";
import { EmailAuthProvider, getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvcgweGuriGg8RlWzNc5-4isLQNNCNK2c",
  authDomain: "sillygoose-cfc85.firebaseapp.com",
  projectId: "sillygoose-cfc85",
  storageBucket: "sillygoose-cfc85.appspot.com",
  messagingSenderId: "60284233358",
  appId: "1:60284233358:web:95dea8eb31d834d684cbdf",
  measurementIda: "G-LZYYLRTMN3"
};

function createFirebaseApp(firebaseConfig: {}) {
  try {
    return getApp();
  } catch {
    return initializeApp(firebaseConfig);
  }
}

const firebaseApp = createFirebaseApp(firebaseConfig);

// Auth exports
export const auth = getAuth(firebaseApp);
export const provider = new EmailAuthProvider();

// Firestore exports
export const firestore = getFirestore(firebaseApp);