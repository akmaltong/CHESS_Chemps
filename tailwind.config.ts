import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'chess-dark': '#0a0a0f',
        'chess-blue': '#1a3a5c',
        'chess-gold': '#c8a960',
        'chess-accent': '#2196F3',
      },
      fontFamily: {
        heading: ['Dela Gothic One', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
