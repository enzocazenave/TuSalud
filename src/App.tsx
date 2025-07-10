import '../gesture-handler'
import './global.css'
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AuthProvider } from './context/AuthContext';
import { RootNavigation } from './navigators/RootNavigation';
import { ThemeProvider, useTheme } from './context/ThemeContext';

export const App = () => {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  )
}

const MainApp = () => {
  const { theme } = useTheme();

  return (
    <React.Fragment>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />

      <SafeAreaProvider>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: theme === 'dark' ? '#1F2937' : '#9ACBD0',
          }}
        >
          <AuthProvider>
            <RootNavigation />
          </AuthProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </React.Fragment>
  );
};
