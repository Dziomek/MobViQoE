/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    colors: {
      'layer-color': 'rgba(0, 0, 0, 0.7)',
      'light': '#E6E6E6',
      'title': 'rgb(250, 235, 215)'
    }
  },
  plugins: [],
}

