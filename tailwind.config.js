/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sumo: {
          bg: '#fff8f0',
          dark: '#0f0a1f',
          accent: '#ff6b6b',
          gold: '#f4c542',
          ink: '#3a2f2f',
          soft: '#d97757',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}