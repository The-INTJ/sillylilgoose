import { auth } from './firebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const [user, loading] = useAuthState(auth);

  return {
    user,
    username: user?.email ?? null,
    loading,
  };
}

export function useCachedData(key: string, getData: Function) {
  const [data, setData] = useState(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    const cachedData = localStorage.getItem(key);
    return cachedData ? JSON.parse(cachedData) : null;
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && !data) {
      getData().then(newData => {
        setData(newData);
        localStorage.setItem(key, JSON.stringify(newData));
      });
    }
  }, [data, getData, key]);

  return data;
}
