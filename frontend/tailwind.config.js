/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "grey" : "#2b2b2a",
        "background" : "#b8b7b4"
      }
    },
  },
  plugins: [],
}

