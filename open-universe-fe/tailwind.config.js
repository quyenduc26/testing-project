const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'violet': '#9925E8',
        'light-blue': '#6569C2'
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 4px 8px var(--tw-shadow-color)',
        xl: '0 6px 12px var(--tw-shadow-color)',
        colors: '0 2px 6px red, 0 2px 4px blue',
      },
      screens: {
        'sm': { max: '414px' },
      },
      animation: {
        takeoff: 'takeoff 4s ease-in-out forwards',
        fire: 'fire 0.5s ease-in-out infinite alternate',
        fires: 'fires 0.01s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
};
