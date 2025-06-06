import React, { useMemo } from 'react';
import { View, Text, Switch } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeSettingsView() {
  const { theme, toggleTheme } = useTheme();
  
  const isDarkMode = useMemo(() => theme === 'dark', [theme]);

  return (
    <View className="flex-1 items-center justify-center bg-quaternary dark:bg-darksecondary">
      <Text className="text-2xl text-primary dark:text-darkprimary mb-5">Seleccionar tema</Text>
      <View className="flex-row items-center gap-3">
        <Text className="text-lg text-primary dark:text-darkprimary">Modo oscuro</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>
    </View>
  );
}
