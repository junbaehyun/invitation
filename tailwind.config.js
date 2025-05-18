/** @type {import('tailwindcss').Config} */
module.exports = {
content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
      extend: {
    backgroundImage: {
paper:  "url('/public/paper-bg.png')", // ✅ public 폴더 기준으로 사용
},
        fontFamily: {
        myeongjo: ["'Nanum Myeongjo'", 'serif'],
      },
      colors: {
        brownText: '#5C4033',
        paperBg: '#FAF3EC',
      },
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