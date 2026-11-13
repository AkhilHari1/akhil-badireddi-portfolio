/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        canvas: '#f9f9f8',
        ink: '#111111',
        muted: '#555555',
        hairline: 'rgba(17, 17, 17, 0.14)',
      },
    },
  },
  plugins: [],
}