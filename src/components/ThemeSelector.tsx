import React from 'react';
import { ThemeType, THEME_OPTIONS } from '../types/theme';

interface ThemeSelectorProps {
  currentTheme: ThemeType;
  onThemeChange: (theme: ThemeType) => void;
}

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  return (
    <div className="flex gap-2 mb-4">
      {THEME_OPTIONS.map((theme) => (
        <button
          key={theme.id}
          onClick={() => onThemeChange(theme.id as ThemeType)}
          className={`flex-1 py-3 px-4 rounded-xl font-semibold text-lg transition-all ${
            currentTheme === theme.id
              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <span className="mr-2">{theme.icon}</span>
          {theme.label}
        </button>
      ))}
    </div>
  );
}
