import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import DailyDevotional from './DailyDevotional';
import messages from './message';


// App 함수 바깥에 추가


function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({});

  
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const end = new Date(targetDate);
      const diff = end - now;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });

      const daysText = document.getElementById("daysLeft");
      if (daysText) daysText.textContent = `${days}일`;
    }, 1000);

    
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-3 text-sm">
      {[['DAYS', timeLeft.days], ['HOUR', timeLeft.hours], ['MIN', timeLeft.minutes], ['SEC', timeLeft.seconds]].map(
        ([label, val]) => (
          <div key={label} className="flex flex-col items-center bg-gray-100 px-3 py-2 rounded">
            <span className="text-lg font-bold">{val?.toString().padStart(2, '0')}</span>
            <span className="text-xs text-gray-500">{label}</span>
          </div>
        )
      )}
    </div>
  );
}
function App() {

const [name, setName] = useState('');
const trimmedName = name.trim();
const specialNames = ['김계원', '이정미', '임하경', '한수아', '박정민', '서상욱', '이수진','황승수','정지연','이지선','김다혜','정순이'];
const isSpecialGuest = specialNames.includes(trimmedName);





  const [submitted, setSubmitted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [now, setNow] = useState(dayjs());
  const [displayedText, setDisplayedText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const typingInterval = useRef(null);

  const imageRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const blockRef = useRef(null);

const selected = messages[trimmedName];
const messageText = selected?.text || `"${name}"님의 초대 메시지가 준비 중입니다. 💌`;
const messageImage = selected?.image || null;
  

useEffect(() => {
  const setRealVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  setRealVh(); // initial call
  window.addEventListener('resize', setRealVh);
  return () => window.removeEventListener('resize', setRealVh);
}, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (imageRef.current) observer.observe(imageRef.current);

    return () => {
      if (imageRef.current) observer.unobserve(imageRef.current);
    };
  }, []);


  // 실시간 시간 갱신
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  
 const handleSubmit = () => {
  setSubmitted(true);
const trimmedName = name.trim();
const selected = messages[trimmedName];
const fullMessage = selected?.text || `"${trimmedName}"님의 초대 메시지가 준비 중입니다. 💌`;

  if (typingInterval.current) clearInterval(typingInterval.current); // ✅ 중복 제거

  setDisplayedText('');
  setTypingIndex(0);

  typingInterval.current = setInterval(() => {
    setDisplayedText((prev) => fullMessage.slice(0, prev.length + 1));
    setTypingIndex((prev) => {
      if (prev >= fullMessage.length - 1) {
        clearInterval(typingInterval.current);
      }
      return prev + 1;
    });
  }, 60);
};

useEffect(() => {
  return () => {
    if (typingInterval.current) clearInterval(typingInterval.current);
  };
}, []);
  const handlePlayMusic = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    }
  };

  

  const getDday = () => {
  const today = new Date();
  const weddingDay = new Date("2025-07-12T00:00:00");
  const diffTime = weddingDay - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 0 ? `D-${diffDays}` : `+${Math.abs(diffDays)}일`;
};
useEffect(() => {
  const audio = audioRef.current;
  if (audio) {
    audio.muted = false;
    audio.play().then(() => {
      setIsPlaying(true);
    }).catch(err => {
      console.warn('자동 재생 실패:', err);
    });
  }
}, []);




  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth relative bg-paper bg-fixed bg-cover  font-myeongjo text-brownText">

      {/* 🎵 오른쪽 아래 재생 버튼 */}
      <button
        onClick={handlePlayMusic}
        className={`fixed bottom-6 right-6 z-50 text-white text-3xl ${
          isPlaying ? 'animate-spin-slow' : ''
        }`}
        aria-label="Play Music"
      >
        🎵
      </button>

      {/* 음악 오디오 */}
      <audio ref={audioRef} autoPlay muted loop>
        <source src={`${process.env.PUBLIC_URL}/blessing.mp3`} type="audio/mpeg" />
      </audio>

      {/* Section 0 - 모바일 청첩장 커버 */}
<section className="h-screen snap-start relative flex items-center justify-center overflow-hidden bg-black">
  {/* 배경 이미지 */}
  <img
    src={`${process.env.PUBLIC_URL}/img1.png`}
    alt="커버 이미지"
    className="absolute inset-0 w-full h-full object-cover scale-105 filter grayscale transition duration-[2s] ease-out"
    style={{ animation: 'toColor 5s ease-out forwards' }}
  />

  {/* 🔥 텍스트 레이어 (항상 보임) */}
  <div className="absolute top-6 left-4 text-pink-300 text-xs font-semibold tracking-wide z-60">
    JUNBAE
  </div>
  <div className="absolute top-6 right-4 text-pink-300 text-xs font-semibold tracking-wide z-60">
    SHOLPAN
  </div>

  <div className="absolute top-20 w-full flex justify-center z-60">
    <p className="text-xl md:text-2xl text-pink-300 tracking-[.25em] uppercase font-semibold">
      We Are Getting Married
    </p>
  </div>

  <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 z-60">
    <h1
      className="text-5xl text-pink-300 font-light italic leading-tight mb-4"
      style={{ fontFamily: `'Dancing Script', cursive` }}
    >
      Wedding Day
    </h1>
    <p className="text-sm tracking-wider text-pink-300">2025.07.12 SAT 11:30 꿈이있는교회</p>
  </div>

  {/* 검정 오버레이 (아래로 사라짐) */}
  <div className="absolute top-0 left-0 w-full h-1/2 bg-black z-50 animate-slideOutTop delay-[3000ms]"></div>
  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-black z-50 animate-slideOutBottom delay-[3000ms]"></div>

    {/* D-Day */}
  <div className="absolute bottom-14 center bg-pink-100 text-pink-600 text-sm font-semibold px-3 py-1 rounded-full shadow-md z-40 animate-fadeInDown delay-[2000ms]">
    {getDday()}
  </div>

  {/* ↓ 아이콘 */}
  <div className="absolute bottom-4 animate-bounce text-pink-300 text-2xl z-40">↓</div>
</section>


{/* Section 1 - 초대합니다 */}
     
    <section className="h-screen flex flex-col items-center justify-start text-center snap-start pt-2 mx-2">

      {/* 초대합니다 */}
      <img
        src={`${process.env.PUBLIC_URL}/og-image.jpg`}
        alt="초대합니다"
      className={`w-full max-w-md rounded-lg shadow-md transform transition-all duration-1000 ease-out ${
          visible ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'
        }`}
      />

      {/* 초청문 이미지 */}
      <img
        ref={imageRef}
        src={`${process.env.PUBLIC_URL}/invitated.png`}
        alt="초청문 이미지"
        className={`w-full max-w-md rounded-lg shadow-md pt-4 transform transition-all duration-1000 ease-out ${
          visible ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'
        }`}
      />
    </section>
  

{/* Section 2 - 인삿말 & D-Day */}

<img
  src={`${process.env.PUBLIC_URL}/wedding.png`}
  alt="결혼합니다"
  ref={imageRef}
  className={`w-full max-w-md rounded-lg shadow-md transform transition-all duration-1000 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      />

<section className="h-screen snap-start bg-white flex flex-col items-center justify-center text-center px-6 py-10 space-y-6 overflow-y-auto">
  {/* 인삿말 */}
  <div className="max-w-lg">
    
    <div className="w-6 h-0.5 bg-orange-300 my-4 mx-auto"></div>
    <p className="text-sm text-gray-800">신랑 현준배 · 신부 살타예바 숄판</p>
  </div>

  {/* 스크롤 가능한 고백문 영역 */}

  

    
      <div
      ref={blockRef}
      className={`max-w-lg w-full h-[700px] overflow-y-auto bg-pink-50 bg-opacity-70 rounded-xl p-4 text-sm text-left text-gray-700 leading-relaxed shadow-inner border border-pink-200 transform transition-all duration-1000 ease-out ${
        visible ? 'opacity-0 translate-y-10' : 'opacity-`100 translate-y-0'
      }`}
    >
    
    <p>
      언어도 문화도 성격도<br />
      카자흐스탄과 한국처럼<br />
      어쩌면 우린 만날 수 없었습니다.<br /><br />
      나의 결핍은 욕구 충족에 메말랐고<br />
      나의 욕망은 타인을 소비했으며<br />
      사랑, 그 사이는 너무 멀었습니다.<br />
      그렇게 캄캄한 어둠만 혼돈했습니다.<br /><br />

      그런데 상관 없는 나를 인내하고 기다려 주고<br />
      기도해 주시는 선교사님, 목사님, 교회 공동체를 통해<br />
      어렴풋이 예수님의 십자가 구원이 조금씩 보였습니다.<br /><br />

      세상에서 경험하지 못했던<br />
      따스함과 책임감과 성실함은 위로가 되었고<br />
      불안했던 나는 조금씩 웃을 수 있었습니다.<br /><br />

      이제 하나님 안에서 담대함을 얻은 나는<br />
      온전한 나의 삶을 삽니다.<br /><br />

      주께서 허락하신 새로운 소원을 가지고<br />
      서로가 용기 있게 만날 수 있습니다.<br /><br />

      그렇게 닿을 수 없던 우리가 십자가로 주님을,<br />
      만날 수 없던 우리가 비로소 사랑하기로 결심합니다.<br /><br />

      그렇게 너와 내가 예수님을,<br />
      서로를 만나<br />
      하나님 안에서 서로를 사랑할 것을 약속합니다.
    </p>
  </div>

  {/* Save the Date */}
  <h2 className="text-orange-400 font-semibold text-lg mt-8">Save the Date</h2>

  <Countdown targetDate="2025-07-12T11:30:00" />

  {/* 하단 문장 */}
  <p className="text-sm mt-4 text-gray-700">
    <span className="font-bold text-pink-600">현준배 ♥ 숄판</span>의 결혼식이 <span id="daysLeft" className="text-pink-500 font-semibold"></span> 남았습니다.
  </p>
</section>

<section className="h-screen snap-start bg-white flex flex-col items-center justify-center px-6 text-center">
  <h2 className="text-xl text-orange-400 font-semibold mb-2">예식 안내</h2>
  <p className="text-lg text-gray-800 mb-1">2025년 7월 12일 토요일 오전 11:30</p>
  <p className="text-md text-gray-600 mb-6">꿈이있는교회</p>

  <div className="w-8 h-0.5 bg-orange-300 mb-6" />

  {/* 와인잔 이미지 */}
  <img
    src={`${process.env.PUBLIC_URL}/wedding.png`} // 파일명을 실제 업로드된 파일명에 맞게 수정하세요
    alt="예식 이미지"
    className="w-full max-w-md rounded-md mb-8 shadow-md"
  />

  {/* 달력 */}
  <h3 className="text-lg text-orange-400 mb-2">7월</h3>
  <div className="text-gray-800">
    <div className="grid grid-cols-7 gap-y-2 text-sm">
      {['일', '월', '화', '수', '목', '금', '토'].map((day, i) => (
        <div key={i} className="font-medium text-gray-500">{day}</div>
      ))}

    
      {/* 날짜들: 2칸 비우고 1일부터 31일까지 */}
{[
  ...Array(2).fill(null), // Sunday & Monday empty
  ...Array.from({ length: 31 }, (_, i) => i + 1),
].map((day, i) => {
  const isSelected = day === 12;
  return (
    <div
      key={i}
      className={`h-8 w-8 flex items-center justify-center rounded-full ${
        isSelected ? 'bg-orange-300 text-white font-bold' : ''
      }`}
    >
      {day || ''}
    </div>
  );
})}
    </div>
  </div>
</section>

    <section className="h-screen snap-start bg-white px-6 py-10 flex flex-col items-center justify-center text-center space-y-6">
  <h2 className="text-3xl font-bold text-gray-800 mb-2">📍 오시는 길</h2>

  {/* 지도 이미지 */}
  <img
    src={`${process.env.PUBLIC_URL}/map.png`}
    alt="지도 이미지"
    className="w-full max-w-md rounded-lg shadow-md"
  />

  {/* 상단 네비게이션 앱 링크 */}
  <div className="flex flex-wrap justify-center gap-4 mt-6">
    <a
      href="nmap://search?query=서울%20마포구%20창전로%2064"
      className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-md shadow hover:bg-green-200 transition"
    >
      <img src={`${process.env.PUBLIC_URL}/navermap_icon.png`} alt="네이버지도" className="w-5 h-5" />
      네이버지도 앱
    </a>
    <a
      href="kakaomap://search?q=서울%20마포구%20창전로%2064"
      className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-md shadow hover:bg-yellow-200 transition"
    >
      <img src={`${process.env.PUBLIC_URL}/kakaomap_icon.png`} alt="카카오맵" className="w-5 h-5" />
      카카오맵 앱
    </a>
  </div>
  {/* 오시는 길 안내 아래쪽 안내 메시지 */}
<div className="mt-10 text-center">
  <p className="text-sm text-gray-600 font-medium mb-2">
    📌 <span className="text-pink-600 font-semibold">주차장은 다른 위치에 있어요</span>
  
  </p>
  <p className="text-xs text-gray-500 mb-1">  “용서해 주세요 😢
주차장은 예식장에서 도보 10분 거리예요.
사랑은… 걷는 거니까요…🚶‍♀️🚶”</p>
  <div className="text-pink-400 text-2xl animate-bounce mt-1">↓</div>
</div>
  </section>
{/* Section - 주차 안내 (CarPlay 스타일) */}
<section className="h-screen snap-start bg-white px-6 py-10 flex flex-col items-center justify-center text-center">
<h2 className="text-2xl font-bold mb-4">🚗 주차 안내</h2>
<p className="text-base text-gray-700 mb-4">
  📍 <span className="font-semibold">서울 마포구 신수동 93-35</span>
</p>
{/* 발렛 파킹 담당자 연락처 */}
<div className="mt-1 flex items-center justify-center gap-2 text-sm text-gray-700">
  <span className="text-lg">🅿️</span>
  <span className="font-semibold">발렛 파킹 담당자:</span>
  <a href="tel:01071978438" className="text-blue-600 underline hover:text-blue-800">
    010-7197-8438
  </a>
</div>

<img
  src={`${process.env.PUBLIC_URL}/parkingimg.png`}
  alt="주차장 안내 이미지"
  className="w-full max-w-md rounded-lg shadow-lg"
/>
  <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-5 border border-gray-100">
    {/* 주차 안내 텍스트 */}
        {/* 지도 앱 버튼들 */}
    <div className="grid grid-cols-3 gap-4">
      {/* Tmap */}
      <a
        href="tmap://search?name=서울 마포구 신수동 93-35"
        className="flex flex-col items-center bg-gray-100 rounded-lg py-3 hover:bg-gray-200 transition"
      >
        <img src={`${process.env.PUBLIC_URL}/tmap_icon.png`} alt="Tmap" className="w-8 h-8 mb-1" />
        <span className="text-xs font-medium text-gray-700">티맵</span>
      </a>

      {/* Kakao Navi */}
      <a
        href="kakaomap://search?q=서울 마포구 신수동 93-35"
        className="flex flex-col items-center bg-gray-100 rounded-lg py-3 hover:bg-gray-200 transition"
      >
        <img src={`${process.env.PUBLIC_URL}/kakao_icon.png`} alt="Kakao" className="w-8 h-8 mb-1" />
        <span className="text-xs font-medium text-gray-700">카카오내비</span>
      </a>

      {/* Naver Map */}
      <a
        href="nmap://search?query=서울 마포구 신수동 93-35"
        className="flex flex-col items-center bg-gray-100 rounded-lg py-3 hover:bg-gray-200 transition"
      >
        <img src={`${process.env.PUBLIC_URL}/navermap_icon.png`} alt="Naver" className="w-8 h-8 mb-1" />
        <span className="text-xs font-medium text-gray-700">네이버지도</span>
      </a>
    </div>
  </div>

  {/* 하단 안내 */}
  <p className="mt-6 text-sm text-gray-400">* 지도 앱을 눌러 바로 길찾기를 시작하세요.</p>
</section>


{/* Section - 예식 타임라인 */}
<section className="snap-start bg-white flex flex-col items-center justify-start px-6 py-12 text-center min-h-screen">
  <h2 className="text-2xl font-bold text-pink-500 mb-8">예식 타임라인</h2>

  <ul className="space-y-6 w-full max-w-md">
    <li className="relative pl-6 text-left">
      <div className="absolute left-0 top-1 w-3 h-3 bg-pink-400 rounded-full"></div>
      <p className="text-sm text-gray-500">🕰️ 11:00</p>
      <p className="text-lg text-gray-800 font-semibold">하객 입장 시작</p>
    </li>

    <li className="relative pl-6 text-left">
      <div className="absolute left-0 top-1 w-3 h-3 bg-pink-400 rounded-full"></div>
      <p className="text-sm text-gray-500">💒 11:30</p>
      <p className="text-lg text-gray-800 font-semibold">결혼식 본식 시작</p>
    </li>

    <li className="relative pl-6 text-left">
      <div className="absolute left-0 top-1 w-3 h-3 bg-pink-400 rounded-full"></div>
      <p className="text-sm text-gray-500">📷 12:15</p>
      <p className="text-lg text-gray-800 font-semibold">하객 기념 촬영</p>
    </li>

    <li className="relative pl-6 text-left">
      <div className="absolute left-0 top-1 w-3 h-3 bg-pink-400 rounded-full"></div>
      <p className="text-sm text-gray-500">🍽️ 12:50</p>
      <p className="text-lg text-gray-800 font-semibold">피로연 및 식사</p>
    </li>
  </ul>


  {/* 🍽️ 식사 예약 안내 */}
  <div className="mt-4 bg-pink-50 border border-pink-200 p-6 rounded-xl shadow max-w-md w-full">
    <h3 className="text-lg font-bold text-pink-600 flex items-center justify-center gap-2 mb-2">
      🍽️ 식사 자리 예약하기
    </h3>
    <p className="text-sm text-gray-700 leading-relaxed mb-3">
      <strong>~ 7월 1일까지</strong> 참석여부 부탁드려요!<br />
      한 분 한 분의 소중한 이름을 테이블에 적어<br />
      정성껏 준비하려 합니다.<br />
      <span className="font-semibold text-pink-500">꼭 아래 구글폼을 제출해주세요!</span>
    </p>
    <a
      href="https://docs.google.com/forms/d/1T74BPurt7zwJpKC88eKwCThGynW9n4IVtmSYo-503uQ/edit"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-pink-500 text-white px-6 py-2 rounded shadow hover:bg-pink-600 transition"
    >
      ✍️ 참석여부 작성
    </a>
    

  </div>
    <p className="mt-3 text-sm text-gray-400">* 일정은 현장 사정에 따라 변경될 수 있습니다.</p>
    
</section>

  {/* 📍식당 가기 섹션 */}
<section className="h-screen snap-start bg-white flex flex-col items-center justify-center px-6 text-center space-y-4">
  <h2 className="text-2xl font-bold text-orange-500">🍽️ 식사 안내</h2>

  <p className="text-lg text-gray-800">
    식사하고 가 주실꺼죠? <span className="text-pink-500 text-2xl">🥺</span>
  </p>
  <p className="text-base text-gray-600">
    레스토랑은 예식장에서 <span className="font-semibold text-orange-600">600m 거리</span>에 있어요.
  </p>

  <img
    src={`${process.env.PUBLIC_URL}/restaurantmap.png`}
    alt="레스토랑 위치 이미지"
    className="w-full max-w-md rounded-md shadow-md my-4"
  />

  <p className="text-sm text-gray-500">아래 버튼을 누르면 모바일에서 길찾기가 열려요!</p>

  {/* 📍 길찾기 버튼 (네이버 & 카카오) */}
<div className="grid grid-cols-2 gap-4 w-full max-w-xs mx-auto mt-6">
  {/* 네이버맵 링크 */}
  <a
    href="https://naver.me/xIeXUCph"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center gap-2 bg-green-500 text-white rounded-lg px-4 py-3 shadow-md hover:bg-green-600 transition"
  >
    <img
      src={`${process.env.PUBLIC_URL}/navermap_icon.png`}
      alt="네이버맵"
      className="w-5 h-5"
    />
    <span className="text-sm font-semibold">네이버 길찾기</span>
  </a>

  {/* 카카오맵 링크 */}
  <a
    href="https://map.kakao.com/?map_type=TYPE_MAP&target=car&rt=%2C%2C537811%2C927642&rt1=&rt2=%EB%8B%A8%EA%B5%AD%EB%8C%80%ED%95%99%EA%B5%90&rtIds=%2C&rtTypes=%2C"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center gap-2 bg-yellow-400 text-black rounded-lg px-4 py-3 shadow-md hover:bg-yellow-500 transition"
  >
    <img
      src={`${process.env.PUBLIC_URL}/kakaomap_icon.png`}
      alt="카카오맵"
      className="w-5 h-5"
    />
    <span className="text-sm font-semibold">카카오 길찾기</span>
  </a>
</div>

  <p className="text-xs text-gray-400 mt-2">
    * 🐾 “조금만 걸으면 맛있는 식사가 기다려요! (운동도 되고 일석이조✨)”
  </p>
</section>
<section className="min-h-screen flex flex-col items-center justify-center text-center snap-start px-6 pt-5 bg-white relative">

  <img
    src={`${process.env.PUBLIC_URL}/verse.png`}
    alt="웨딩 장식"
    className="w-full max-w-md object-cover rounded-lg shadow mb-6"
  />

  <div className="w-full max-w-md bg-pink-50 bg-opacity-70 p-6 rounded-2xl shadow-lg space-y-4 transition-all duration-700 ease-out">
    {!submitted && (
      <>
        <input
          type="text"
          placeholder="성함을 입력해주세요"
          className="w-full px-4 py-3 border border-pink-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-pink-500 text-white py-2 rounded-xl hover:bg-pink-600 transition"
        >
          💌 초대 메시지 보기
        </button>
      </>
    )}

    {/* 🎯 메시지 출력 영역 */}
  {submitted && (
  <div className="mt-6 text-lg text-gray-700 px-3 text-center space-y-4 transition-all duration-1000 ease-out transform opacity-100 translate-y-0">
    
    {/* 🎯 이미지 출력 */}
    {messageImage && (
      <img
        src={`${process.env.PUBLIC_URL}${messageImage}`}
        alt={`${name}님 사진`}
        className="mx-auto w-full max-w-xs rounded-lg object-contain shadow-md"
      />
    )}

    {/* 🎯 메시지 텍스트 출력 */}
    <p className="whitespace-pre-line">{displayedText || messageText}</p>
  </div>
)}
  </div>
</section>
{/* 감사의 말씀 섹션 */}
<section className="min-h-screen snap-start bg-[#FFF7F0] flex flex-col items-center justify-center px-6 py-12 text-center text-brownText">
  <h2 className="text-2xl font-bold text-orange-500 mb-6">💝 감사의 말씀</h2>
  
  <p className="text-sm text-gray-700 leading-relaxed max-w-xl mb-8">
    이 곳에 오기 까지 쉽지 않았지만,<br/>
    포기하지 않고 함께 기도하며 인내해 주신 분들께 진심으로 감사드립니다.
  </p>

  <div className="text-sm text-left max-w-xl space-y-4 bg-white p-6 rounded-xl shadow-md">
  <p>특별히 저희의 오락가락하는 마음과 감정으로 힘드셨던 분들:<br />
임하경 선교사님, 한수아 선교사님, 황승수 목사님, 정지연 사모님</p>

<p>인고의 시간을 견디며 숄판의 배우자를 위해 오~랜 시간 기도해 주시며 함께해 주신 분들:<br />
김계원 선생님, 이정미 선생님</p>

<p>숄판의 배우자를 위해 기도 하다하다 지쳐 쓰러질뻔 했던 분이 몇 분 계시다는 소문이..</p>

<p>숄판 & 준배' 예비 부부 양육:<br />
임하경 선교사님, 한수아 선교사님, 황승수 목사님, 정지연 사모님</p>

<p>예배&예식 장소 지원:<br />
꿈교회공동체</p>

<p>청첩장, 예배 순서지 디자인 및 제작 지원:<br />
박은옥 전도사님</p>

<p>신랑 신부 어머님 예복 지원:<br />
박은옥 전도사님</p>

<p>결혼식 & 웨딩 사진 촬영 및 지원:<br />
호길형님</p>

<p>제주도 신혼여행 웨딩사진 촬영 및 숙박 지원:<br />
녕인누나</p>

<p>신랑, 신부, 어머님 메이크업 및 스타일 지원:<br />
봄애 집사님</p>

<p>축가:<br />
가수 & 연예인 - 완전 멋진 상욱형님 🎤</p>

<p>예식 및 교회 안내:<br />
김다혜전도사님, 용찬형제, 정훈형제, 수녕형제, 재원형제, 재현형제</p>

<p>사회자:<br />
진짜 호주 왕복 티켓 사서 사회자 볼꺼야 정민아???</p>

<p>처음 하나님께로 인도해 주신 분:<br />
제충만 형님</p>

<p>살며 아름다운 첫 믿음의 공동체를 경험케 해주신 형님 누님:<br />
호길, 진영, 주희, 충만</p>

<p>준배 사람 만들어 주신 분들:<br />
김향래 어머님, 김주형 목사님</p>

<p>기도로 빚어 주신 분들:<br />
진기현 목사님, 꿈교회 공동체</p>

<p>방글라데시 난민촌에서 예수님의 손과 발이 되는 삶을 가르쳐 주신 분:<br />
김해성 목사님</p>

<p>청년부 리더로 결혼 준비도 함께 해주신:<br />
예레미야 온맘다혜 전도사님</p>

<p>언제나 응원해주시고 지지해 주시는:<br />
이수진 목사님, 이지선 사모님</p>

<p>🔥ball 친구들:<br />
재의, 용석, 용현, 윤석, 승환, 성한, 석훈, 동영, 대희, 기환</p>

<p>꿈교회 남자청년부 브로멘스 형제들:<br />
정훈, 수보, 수빈, 순녕, 재원<br />
(브로맨스 은혜 넘침 😎 하나님만 본다… 이젠 안녕)</p>

<p>아름다운 상을 나눠주신 분들:<br />
효진쌤, 재림쌤, 혜윤쌤, 시은쌤, 영현쌤, 은지쌤, 가람쌤</p>

<p>전국 농협 외국어 통역 어벤져스 선배님들:<br />
멋진 신윤희 팀장님, 자책마요 완벽해요 유진 강사님, 캡틴 세진대장, 동규 형님, 신우회 리더 은화 선배님, 정훈 선배님, 현진 선배, 이웃집 미현누나, 정갈리나</p>

<p>예식장의 꽃과 향기: 참석해 주시는 분들 💐</p>

<p>And good friends:<br />
Shakir 🌍</p>
    <p className="italic text-sm text-gray-600">
      여기서 다 말 할 수 없었던 분들은,<br />
      빛도 그늘도 없는 곳에서 남몰래 지지해주시고 기도해주셨던 감사한 분들입니다.<br />
      여러분들이 계셨기 때문에 오늘의 제가 있습니다.<br />
      <strong>감사랑합니다!</strong>
    </p>
</div>
  <p className="text-xs text-gray-500 mt-6 italic">
    이 모든 것을 주관하신 분: <strong>하나님</strong>
  </p>

  <p className="text-sm mt-4 text-gray-400">
    💌 감사한 마음 담아: 준배 & 숄판 올림 <br/>
  </p>
  
</section>


{/* Section 3 - 성경 말씀 */}
<section className="h-screen snap-start bg-pink-100 flex flex-col items-center justify-center px-6 text-center">
  {/* 날짜와 시간 */}
  <p className="text-sm text-gray-500 mb-2">
    {now.format('dddd, MMMM D, YYYY • HH:mm:ss')}
  </p>

  <h2 className="text-2xl font-semibold mb-4">📖 Today’s Devotional</h2>

  {/* 말씀 내용 */}
  <div className="bg-white rounded-lg shadow-md max-w-lg w-full h-[60vh] overflow-y-auto px-5 py-4 text-left text-[15px] leading-relaxed text-brownText font-myeongjo">
    <DailyDevotional />
  </div>

  {/* 출처 */}
  <p className="mt-4 text-xs text-gray-500 italic">
    From <strong>“Jesus Calling”</strong> by Sarah Young
  </p>
</section>


{/* ✅ 새로운 Vision & Prayer Section */}
{submitted && isSpecialGuest && (
<section className="min-h-screen snap-start bg-[#FFF3F7] px-6 py-10 flex flex-col items-center justify-center text-center space-y-6">
  <h2 className="text-2xl font-bold text-orange-500 mb-2">🎯 Vision & Prayer</h2>
  <p className="text-sm text-gray-700 leading-relaxed max-w-lg">
    Our Father in heaven,<br />
    Your kingdom come,<br />
    Your will be done,<br />
    on earth as it is in heaven.<br /><br />
    그러므로 너희는 가서 모든 민족을 제자로 삼고...
  </p>

  <div className="text-left text-sm text-gray-800 bg-white p-4 rounded-lg shadow max-w-md w-full space-y-3">
    <p><strong>📍 지금:</strong> 예비부부 교육 + 결혼예배 준비</p>
    <p><strong>🕊️ 1년:</strong> 한국 정착, 언어문화 교류, 첫 아이 출산</p>
    <p><strong>👣 2년:</strong> 양육 + 커리어 준비</p>
    <p><strong>🌱 4년:</strong> 둘째 출산 + 3천만 원 훈련 기금 준비</p>
    <p><strong>🕯️ 8년:</strong> 셋째 출산 + 제자훈련</p>
    <p><strong>🌍 10년:</strong> 파송 또는 선교지에서 복음 전파</p>
  </div>

  <a
    href="https://prezi.com/view/5d2OzX7HWdS3PbMxBh7d/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-pink-600 underline text-sm hover:text-pink-800"
  >
    👉 비전 로드맵 자세히 보기
  </a>

  <p className="mt-4 text-gray-600 text-sm italic">
    카작 청년에게 믿음을, 땅 끝까지 그리스도를.
  </p>
</section>
)}
    </div>
  );
}

export default App;