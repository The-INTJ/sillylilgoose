'use client'
import './globals.css'
import Login from '../pages/Login';
import { useState } from 'react';

export default function RootLayout({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <html lang="en">
      <head />
      <body>
        {loggedIn ? children : <Login setLoggedIn={() => setLoggedIn(true)} />}
      </body>
    </html>
  )
}
