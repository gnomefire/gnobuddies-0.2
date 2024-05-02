/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
  
  plugins: [require('flowbite/plugin')],
  darkMode: 'class',
  
  theme: {
    extend: {
      colors: {
        // flowbite-svelte
        primary: {
          50: '#F3EFFF',
          100: '#EDEBFE',
          200: '#DDB5FE',
          300: '#C48FFF',
          400: '#B062F5',
          500: '#913DFF',
          600: '#722ED1',
          700: '#57249F',
          800: '#3E1A6D',
          900: '#27124B'
        }
      }
    }
  }
}

