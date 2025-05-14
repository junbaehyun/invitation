/** @type {import('tailwindcss').Config} */
module.exports = {
content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
  animation: {
      'spin-slow': 'spin 4s linear infinite',
    fadeInUp: 'fadeInUp 1.2s ease-out forwards',
    fadeInDown: 'fadeInDown 1.2s ease-out forwards',
  },
  keyframes: {
    fadeInUp: {
      '0%': { opacity: 0, transform: 'translateY(20px)' },
      '100%': { opacity: 1, transform: 'translateY(0)' },
    },
    fadeInDown: {
      '0%': { opacity: 0, transform: 'translateY(-20px)' },
      '100%': { opacity: 1, transform: 'translateY(0)' },
    },
  },
}
  },
  plugins: [],
}
