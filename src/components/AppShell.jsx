'use client'

import Header from '@/components/Header';
import Login from '@/app/Login';
import Loading from '@/app/loading';
import ThemeProvider from '@/components/ThemeProvider';
import { UserContext } from '@lib/context';
import { useUserData } from '@lib/hooks';

export default function AppShell({ children }) {
  const userData = useUserData();

  return (
    <ThemeProvider>
      <UserContext.Provider value={userData}>
        {userData.loading ? <Loading /> : userData.username ? (
          <>
            <Header />
            {children}
          </>
        ) : (
          <Login />
        )}
      </UserContext.Provider>
    </ThemeProvider>
  );
}
