/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // or 'media' based on your preference
  content: ["./public/**/*.html", "./public/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
