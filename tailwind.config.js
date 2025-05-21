/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // ✅ 커스텀 키프레임 정의
      keyframes: {
        extend: {
           slideOutTop: {
        '0%': { transform: 'translateY(0%)' },
        '60%': { transform: 'translateY(0%)' }, // 잠시 멈춤
        '100%': { transform: 'translateY(-100%)' },
      },
      slideOutBottom: {
        '0%': { transform: 'translateY(0%)' },
        '60%': { transform: 'translateY(0%)' }, // 잠시 멈춤
        '100%': { transform: 'translateY(100%)' },
      },

        shrinkText: {
          '0%': { transform: 'scale(1.8)', opacity: '0' },
          '40%': { opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        },
        animation: {
          shrinkText: 'shrinkText 2.5s ease-out forwards',
          slideOutTop: 'slideOutTop 2.5s ease-out forwards',
          slideOutBottom: 'slideOutBottom 2.5s ease-out forwards',
        },

        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: 0, transform: 'translateY(-20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' }
        },
        blink: {
          '50%': { 'border-color': 'transparent' }
        },

        // ✅ 오버레이용 위/아래 슬라이드 키프레임
        slideOutTop: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        slideOutBottom: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },

      // ✅ 애니메이션 이름과 지속 시간 매핑
      animation: {
        'fadeIn': 'fadeIn 1.5s ease-out forwards',
        'fadeOut': 'fadeOut 2s ease-out forwards',
        'fadeInUp': 'fadeInUp 1.2s ease-out forwards',
        'fadeInDown': 'fadeInDown 1.2s ease-out forwards',
        'typing': 'typing 5s steps(40, end) forwards',
        'blink': 'blink 1s step-end infinite',
        'spin-slow': 'spin 4s linear infinite',

        // ✅ 오버레이용
        'slideOutTop': 'slideOutTop 1.4s ease-out forwards',
        'slideOutBottom': 'slideOutBottom 1.4s ease-out forwards',
      },

      // ✅ 커스텀 배경
      backgroundImage: {
        paper: "url('/public/paper-bg.png')",
      },

      // ✅ 폰트
      fontFamily: {
        myeongjo: ["'Nanum Myeongjo'", 'serif'],
      },

      // ✅ 컬러
      colors: {
        brownText: '#5C4033',
        paperBg: '#FAF3EC',
      },
    },
  },
  plugins: [],
};