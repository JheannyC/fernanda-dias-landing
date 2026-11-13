/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#292263',
        plum: '#342b83',
        lavender: '#eeeafa',
        cream: '#fffaf5',
        gold: '#c69a55',
      },
      fontFamily: {
        sans: ['DM Sans', 'Avenir Next', 'sans-serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 22px 60px rgba(41, 34, 99, 0.1)',
      },
    },
  },
  plugins: [],
}
