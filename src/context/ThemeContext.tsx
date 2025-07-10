import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme as useNativeWindColorScheme } from 'nativewind';

export type Theme = 'light' | 'dark';
const STORAGE_KEY = 'APP_THEME';

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
  const { setColorScheme } = useNativeWindColorScheme();

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(STORAGE_KEY);
        const initialTheme = savedTheme as Theme || Appearance.getColorScheme() || 'light';
        setTheme(initialTheme);
        setColorScheme(initialTheme);
      } catch (e) {
        console.error('Error loading theme from storage:', e);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    try {
      await AsyncStorage.setItem(STORAGE_KEY, newTheme);
    } catch (e) {
      console.error('Error saving theme to storage:', e);
    }

    setTheme(newTheme);
    setColorScheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
