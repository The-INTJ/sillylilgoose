export const THEME_CONFIG = {
  collection: 'config',
  document: 'current-theme',
  field: 'currentTheme',
} as const;

export const DEFAULT_THEME = 'spring';

export const THEME_NAMES = ['spring', 'halloween'] as const;

export type ThemeName = (typeof THEME_NAMES)[number];

type NoteCardArt =
  | {
      kind: 'symbol';
      value: string;
      label: string;
    }
  | {
      kind: 'image';
      label: string;
    };

export type ThemeMetadata = {
  noteCardArt: NoteCardArt;
  hideStackedNoteUntilExpanded: boolean;
};

export const THEME_METADATA: Record<ThemeName, ThemeMetadata> = {
  spring: {
    noteCardArt: {
      kind: 'symbol',
      value: 'egg',
      label: 'egg',
    },
    hideStackedNoteUntilExpanded: false,
  },
  halloween: {
    noteCardArt: {
      kind: 'image',
      label: 'pumpkin',
    },
    hideStackedNoteUntilExpanded: true,
  },
};

export function normalizeThemeName(theme: unknown): ThemeName {
  if (typeof theme !== 'string') {
    return DEFAULT_THEME;
  }

  switch (theme.trim().toLowerCase()) {
    case 'halloween':
    case 'spoopy':
      return 'halloween';
    case 'spring':
      return 'spring';
    default:
      return DEFAULT_THEME;
  }
}

export function getThemeMetadata(theme: unknown): ThemeMetadata {
  return THEME_METADATA[normalizeThemeName(theme)];
}
