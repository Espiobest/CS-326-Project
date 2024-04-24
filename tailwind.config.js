/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    colors: {
    'charcoal': '#564d4a',
    'pearl-white': '#f7f4f3',
    'burgundy': '#7f1f3a',
    'rosewood': '#984b61',
    'crimson': '#ba1b1d',
    'coral-red': '#ff6663',
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      red: colors.red,
    },
  },
  plugins: [],
}