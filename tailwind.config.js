/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#006A71',
        secondary: '#9ACBD0',
        tertiary: '#48A6A7',
        quaternary: '#E7EFF2',
        quinary: '#006A71',
        darkprimary: '#5CC8D7',
        darksecondary: '#1E2022',
        darktertiary: '#2D5C6F',
        darkquaternary: '#121212',
        darkquinary: '#5CC8D7',
      },
    },
  },
  plugins: [],
}

