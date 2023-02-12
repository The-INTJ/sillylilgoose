'use client'
import './globals.scss'
import Header from '../components/Header';
import Login from './Login';
import { useState } from 'react';

export default function RootLayout({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  return (

    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Caveat&display=swap" rel="stylesheet" />
      </head>
      <body>
        {loggedIn ? <Header /> : null}
        {loggedIn ? children : <Login setLoggedIn={() => setLoggedIn(true)} />}
      </body>
    </html>
  )
}
