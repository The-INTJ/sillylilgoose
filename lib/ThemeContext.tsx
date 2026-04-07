import { createContext, useContext } from 'react';
import {
  DEFAULT_THEME,
  getThemeMetadata,
  type ThemeMetadata,
  type ThemeName,
} from './theme';

type ThemeContextValue = {
  theme: ThemeName;
  metadata: ThemeMetadata;
};

export const ThemeContext = createContext<ThemeContextValue>({
  theme: DEFAULT_THEME,
  metadata: getThemeMetadata(DEFAULT_THEME),
});

export const useTheme = () => useContext(ThemeContext);
