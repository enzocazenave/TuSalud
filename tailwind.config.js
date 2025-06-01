/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#006A71',
        secondary: '#9ACBD0',
        tertiary: '#48A6A7',
        quaternary: '#E7EFF2',
        quinary: '#006A71',
      },
    },
  },
  plugins: [],
}

