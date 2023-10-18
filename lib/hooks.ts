import { auth, firestore } from './firebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, collection } from 'firebase/firestore';

// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    if (user) {
      const ref = collection(firestore, "Users");
      // console.log("ref" + ref); // add listener here
      setUsername(user.email);
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, username };
}

export function useCachedData(key: string, getData: Function) {
  const [data, setData] = useState(() => {
    const cachedData = localStorage.getItem(key);
    return cachedData ? JSON.parse(cachedData) : null;
  });

  useEffect(() => {
    if (!data) {
      getData().then(newData => {
        setData(newData);
        localStorage.setItem(key, JSON.stringify(newData));
      });
    }
  }, [data, getData, key]);

  return data;
}