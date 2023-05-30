/** @type {import('tailwindcss').Config} */
// const withMT = require("@material-tailwind/react/utils/withMT");
const withMT = require("@material-tailwind/html/utils/withMT");

module.exports = withMT({
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  screens: {
 
  },
  plugins: [],
});