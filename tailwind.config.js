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
        darksecondary: '#121212',
        darktertiary: '#1F2937',
        darkquaternary: '#121212',
        darkquinary: '#5CC8D7',
      },
    },
  },
  plugins: [],
}

