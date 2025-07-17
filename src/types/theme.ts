// Types for theme selection
export type ThemeType = 'motivation' | 'magical';

// Theme options for the selector
export const THEME_OPTIONS = [
  { id: 'motivation', label: 'Motivation', icon: '🌟' },
  { id: 'magical', label: 'Magical', icon: '✨' }
] as const;
