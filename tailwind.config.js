/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        echo: {
          black: '#0A0A0A',
          card: '#141414',
          surface: '#1A1A1A',
          border: '#222222',
          orange: '#FF9500',
          orangeHover: '#E68600',
          muted: '#666666',
          subtle: '#999999',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
