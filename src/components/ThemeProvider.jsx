'use client'
import { useState, useEffect } from 'react';
import { ThemeContext, THEMES } from '@lib/ThemeContext';

export default function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState('spring');

  // Load persisted theme on mount
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved && THEMES.includes(saved)) {
      setThemeState(saved);
    }
  }, []);

  // Apply theme attribute to <html> and persist
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeState }}>
      {children}
    </ThemeContext.Provider>
  );
}
