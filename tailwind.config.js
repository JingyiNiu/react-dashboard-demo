/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: { 100: '#eef6f7', 500: '#86d1d6', 800: '#65bdc4', 900: '#038894' },
                secondary: { 500: '#9DC08B' },
                dark: '#16181a',
                light: '#f5f5f5',
                white: '#ffffff',
            },
        },
    },
    plugins: [],
};
