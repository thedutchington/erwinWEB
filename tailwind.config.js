/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: 'rgb(var(--color-paper) / <alpha-value>)',
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        subtle: 'rgb(var(--color-subtle) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        gold: '#F59E0B', // Standard Gold
        amber: {
          500: '#F59E0B',
          400: '#FBBF24',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'noise': "url('/noise.png')",
      },
      boxShadow: {
        'editorial': '0 4px 20px -2px rgba(0, 0, 0, 0.5)', // Darker shadow for dark mode
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'aurora-text': 'aurora-text 8s linear infinite',
        'aurora-gradient': 'aurora-gradient 12s ease infinite alternate',
        'grid-flow-x': 'grid-flow-x 10s linear infinite',
        'grid-flow-y': 'grid-flow-y 10s linear infinite',
      },
      keyframes: {
        'grid-flow-x': {
          '0%': { 'background-position': '0% 0%' },
          '100%': { 'background-position': '200% 0%' },
        },
        'grid-flow-y': {
          '0%': { 'background-position': '0% 0%' },
          '100%': { 'background-position': '0% 200%' },
        },
        'aurora-text': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'aurora-gradient': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
      },
    },
  },
  plugins: [],
}
