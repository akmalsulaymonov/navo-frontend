/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#323F90',
        secondary: '#1486C8',
        soft: '#F7F8FA',
        breaking: '#E53935',
      },
      maxWidth: { content: '1280px' },
    },
  },
  plugins: [],
}
