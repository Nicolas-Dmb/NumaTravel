/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        numa: {
          white: "#ebe6e2",
          red: "#bf5846",
          black: "#3a3335",
        },
      },
      fontFamily: {
        cormorant: ["Cormorant", "serif"],
        delicious: ["Delicious", "sans-serif"],
        poppins: ["Poppins", "cursive"],

      },
    },
  },
  plugins: [],
}
