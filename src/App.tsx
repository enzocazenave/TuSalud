import './global.css'

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AuthProvider } from './context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './navigators/AuthStack';

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  )
}

export const App = () => {
  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" />
      
      <SafeAreaProvider>
        <SafeAreaView className="flex-1">
          <AuthProvider>
            <RootNavigation />
          </AuthProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </React.Fragment>
  )
}
