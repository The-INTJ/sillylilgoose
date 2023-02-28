'use client'
import styles from '@/styles/pages/Login.module.scss';
import { useState } from 'react';
import {
    signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from '@lib/firebase';

const Login = () => {
    const [password, setPassword] = useState("");

    return (
        <div className={styles.loginContainer}>
            <h1>Login</h1>
            <input type='password' onInput={(e) => setPassword(e.target.value.toLowerCase())}/>
            <button onClick={() => signInWithEmailAndPassword(auth, 'adeline@email.com', password)}>Login</button>
        </div>
    )
}

export default Login;