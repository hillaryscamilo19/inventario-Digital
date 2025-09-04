/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",   // Muy importante para Angular
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
