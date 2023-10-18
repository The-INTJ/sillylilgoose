'use client'
import './globals.scss'
import Header from '@/components/Header';
import Login from './Login';
import { UserContext } from "@lib/context";
import { useUserData } from '@lib/hooks';

export default function RootLayout({ children }) {
  const userData = useUserData();
  return (

    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Caveat&display=swap" rel="stylesheet" />
      </head>
      <body>
        <UserContext.Provider value={userData} >
          {userData.username ? <Header /> : null}
          {userData.username ? children : <Login />}
        </UserContext.Provider>
      </body>
    </html>
  )
}
