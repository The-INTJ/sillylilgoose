import { createContext, useContext } from 'react';

export type ThemeName = 'spring' | 'spoopy';

export const THEMES: ThemeName[] = ['spring', 'spoopy'];

export const ThemeContext = createContext<{
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
}>({ theme: 'spring', setTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);
