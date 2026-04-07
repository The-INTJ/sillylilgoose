'use client'
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { ThemeContext } from '@lib/ThemeContext';
import { firestore } from '@lib/firebase';
import {
  DEFAULT_THEME,
  getThemeMetadata,
  normalizeThemeName,
  THEME_CONFIG,
} from '@lib/theme';

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(DEFAULT_THEME);

  useEffect(() => {
    let isMounted = true;

    async function loadTheme() {
      try {
        const themeDoc = await getDoc(
          doc(firestore, THEME_CONFIG.collection, THEME_CONFIG.document)
        );
        const nextTheme = normalizeThemeName(
          themeDoc.exists() ? themeDoc.data()?.[THEME_CONFIG.field] : undefined
        );

        if (isMounted) {
          setTheme(nextTheme);
        }
      } catch {
        if (isMounted) {
          setTheme(DEFAULT_THEME);
        }
      }
    }

    loadTheme();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, metadata: getThemeMetadata(theme) }}>
      {children}
    </ThemeContext.Provider>
  );
}
