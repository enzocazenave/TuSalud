import '../gesture-handler'
import './global.css'
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AuthProvider } from './context/AuthContext';
import { RootNavigation } from './navigators/RootNavigation';
import RNBootSplash from 'react-native-bootsplash'

export const App = () => {
  useEffect(() => {
    RNBootSplash.hide({ fade: true })
  }, [])

  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" />
      
      <SafeAreaProvider>
        <SafeAreaView className="flex-1" style={{ backgroundColor: '#9ACBD0' }}>
          <AuthProvider>
            <RootNavigation />
          </AuthProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </React.Fragment>
  )
}
