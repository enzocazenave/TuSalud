import '../gesture-handler'
import './global.css'
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { RootNavigation } from './navigators/RootNavigation';
import RNBootSplash from 'react-native-bootsplash'

const AppContent = () => {
  const { theme } = useTheme();

  return (
    <>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      <SafeAreaProvider>
        <SafeAreaView
          className={`${theme === 'dark' ? 'dark' : ''} flex-1`}
          style={{ backgroundColor: theme === 'dark' ? '#121212' : '#9ACBD0' }}
        >
          <AuthProvider>
            <RootNavigation />
          </AuthProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

export const App = () => {
  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, []);

  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};
