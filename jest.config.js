module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|@react-navigation' +
      '|@react-native-firebase' +
      '|@react-native-async-storage' +
      '|lucide-react-native' +
      '|react-native-css-interop' +
      '|react-native-calendars' +
      '|react-native-gesture-handler' +
      '|react-native-swipe-gestures' +
      ')/)',

  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
