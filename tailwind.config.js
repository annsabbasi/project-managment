/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-grey': '#424242',
        'medium-grey': '#616161',
        'light-grey': '#757575',
        'hover-grey': '#f5f5f5'
      }
    },
  },
  plugins: [],
}

