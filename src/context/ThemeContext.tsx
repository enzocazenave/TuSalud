import React, { createContext, useContext, useState, ReactNode } from 'react';
import { NativeWindStyleSheet } from 'nativewind';

export type Theme = 'light' | 'dark';

interface ThemeContextState {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextState>({
  theme: 'light',
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    NativeWindStyleSheet.setColorScheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
