/** @type {import('tailwindcss').Config} */
import flowbite from 'flowbite-react/tailwind'
// const flowbite = require('flowbite-react/tailwind')
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
    "./src/custom.css",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
  ],
}