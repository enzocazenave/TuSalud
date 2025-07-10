import React from 'react';
import { render } from '@testing-library/react-native';
import { App } from '../src/App';

jest.mock('react-native-gesture-handler', () => ({
  Swipeable: () => null,
  DrawerLayout: () => null,
  State: {},
  PanGestureHandler: () => null,
  TapGestureHandler: () => null,
  LongPressGestureHandler: () => null,
  GestureHandlerRootView: ({ children }: any) => children,
}));

jest.mock('../src/global.css', () => ({}));

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: any) => children,
  SafeAreaView: ({ children }: any) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

jest.mock('../src/context/ThemeContext', () => ({
  ThemeProvider: ({ children }: any) => children,
  useTheme: () => ({ theme: 'light' }),
}));

jest.mock('../src/context/AuthContext', () => ({
  AuthProvider: ({ children }: any) => children,
}));

jest.mock('../src/navigators/RootNavigation', () => {
  const { Text } = require('react-native');
  return {
    RootNavigation: () => <Text testID="root-nav">Root Navigation</Text>,
  };
});


describe('App', () => {
  it('renderiza correctamente RootNavigation', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('root-nav')).toBeTruthy();
  });
});
