import '../gesture-handler'
import './global.css'
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AuthProvider } from './context/AuthContext';
import { RootNavigation } from './navigators/RootNavigation';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import RNBootSplash from 'react-native-bootsplash'

export const App = () => {
   useEffect(() => {
    RNBootSplash.hide({ fade: true })
  }, [])
  
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
      <StatusBar barStyle={'light-content'} />

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
