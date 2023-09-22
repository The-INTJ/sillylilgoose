'use client'
import styles from '@/styles/pages/login/Login.module.scss';
import { useState } from 'react';
import {
    signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from '@lib/firebase';

const Login = () => {
    const [password, setPassword] = useState("");
    const isSpoopy = true;

    return (
        <div className={`${styles.loginContainer} ${isSpoopy ? styles.spoopy : ''}`}>
            <h1>Login</h1>
            <input type='password' onInput={(e) => setPassword(e.target.value.toLowerCase())}/>
            <button onClick={() => signInWithEmailAndPassword(auth, 'adeline@email.com', password)}>Login</button>
        </div>
    )
}

export default Login;