/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            primary: '#86d1d6',
            primary800: '#65bdc4',
            secondary: '#9DC08B',
            dark: '#16181a',
            light: '#f5f5f5',
            white: '#ffffff',
        },
    },
},
  plugins: [],
}