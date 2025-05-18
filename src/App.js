import React, { useState, useRef ,useEffect} from 'react';
import DailyVerse from './DailyVerse';


  
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
  const [submitted, setSubmitted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleSubmit = () => {
    setSubmitted(true);
  };
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

  const messages = {
    "수정": " this is test updated by now for gh-branch 사랑하는 수빈님, 그리스도의 사랑으로 당신을 초대합니다 💕",
    "지훈": "지훈 형제님, 주님의 평화가 함께하길 바랍니다 🙏",
    "하늘": "하늘 자매님, 함께하는 기쁨을 나누고 싶어요 ☁️",
  };

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth relative">

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
      <section className="h-screen snap-start relative flex items-center justify-center overflow-hidden bg-white">
        <img
          src={`${process.env.PUBLIC_URL}/img1.png`}
          alt="커버 이미지"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
 {/* D-Day 표시 */}
  <div className="absolute bottom-16 center bg-pink-100 text-pink-600 text-sm font-semibold px-3 py-1 rounded-full shadow-md animate-fadeInDown">
    {getDday()}
  </div>
        {/* 이름 & 문구 */}
        <div className="absolute top-6 left-4 text-pink-300 text-xs font-semibold tracking-wide animate-fadeInDown">
          JUNBAE
        </div>
        <div className="absolute top-6 right-4 text-pink-300 text-xs font-semibold tracking-wide animate-fadeInDown">
          SHOLPAN
        </div>
        <div className="absolute top-20 w-full flex justify-center animate-fadeInDown delay-200">
          <p className="text-sm text-pink-300 tracking-[.25em] uppercase">We Are Getting Married</p>
        </div>

        {/* 중앙 하단 텍스트 */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 animate-fadeInUp delay-500">
          <h1
            className="text-5xl text-pink-300 font-light italic leading-tight mb-4"
            style={{ fontFamily: `'Dancing Script', cursive` }}
          >
            Wedding Day
          </h1>
          <p className="text-sm tracking-wider text-pink-300">2025.07.12 SAT 11:30 꿈이있는교회</p>
        </div>
          {/* D-Day 줄 */}
  

        <div className="absolute bottom-6 animate-bounce text-pink-300 text-2xl">↓</div>
      </section>

      {/* Section 1 - 이름 입력 */}
      <section className="h-screen flex flex-col items-center justify-start bg-pink-50 text-center snap-start pt-6">

       {/* 이미지 상단 고정 */}
  <img
    src={`${process.env.PUBLIC_URL}/og-image.jpg`}
    alt="레터 이미지"
    className="w-full max-w-md mb-6 rounded-lg shadow-md mt-2"
  />
      
      

        {!submitted ? (
          <>
            <input
              type="text"
              placeholder="성함을 입력해주세요"
              className="border border-pink-300 rounded px-4 py-2 mb-4 w-full max-w-xs"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600"
            >
              확인
            </button>
          </>
        ) : (
          <div className="mt-6 text-lg text-gray-700">
            {messages[name.trim()] || `"${name}"님의 초대 메시지가 준비 중입니다. 💌`}
          </div>
        )}
      </section>
{/* Section 2 - 인삿말 & D-Day */}

<img
  src={`${process.env.PUBLIC_URL}/wedding.png`}
  alt="웨딩 장식"
  className="w-full max-h-96 object-cover rounded-lg shadow mb-6"
/>
<section className="h-screen snap-start bg-white flex flex-col items-center justify-center text-center px-6 py-10 space-y-6">
  {/*  인삿말 */}
  <div className="max-w-lg">
    <p className="text-base leading-relaxed text-gray-700">
      살랑이는 바람결에<br />
      사랑이 묻어나는 계절입니다.<br /><br />
      여기 곱고 예쁜 두 사람이 사랑을 맺어<br />
      인생의 반려자가 되려 합니다.
    </p>
    <div className="w-6 h-0.5 bg-orange-300 my-4 mx-auto"></div>
    <p className="text-sm text-gray-800">신랑 현준배 · 신부 숄판</p>
  </div>

  {/* Save the Date 타이틀 */}
  <h2 className="text-orange-400 font-semibold text-lg mt-10">Save the Date</h2>

  {/* D-Day 카운트다운 */}
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
    src={`${process.env.PUBLIC_URL}/wedding-toast.jpg`} // 파일명을 실제 업로드된 파일명에 맞게 수정하세요
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

      {/* 날짜들: 공백 + 1~31 */}
      {Array.from({ length: 31 + 1 }, (_, i) => {
        const day = i === 0 ? null : i;
        const isSelected = day === 12;

        return (
          <div key={i} className={`h-8 w-8 flex items-center justify-center rounded-full ${isSelected ? 'bg-orange-300 text-white font-bold' : ''}`}>
            {day || ''}
          </div>
        );
      })}
    </div>
  </div>
</section>

{/* Section - 예식 타임라인 */}
<section className="h-screen snap-start bg-white flex flex-col items-center justify-center px-6 py-12 text-center">
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
      <p className="text-sm text-gray-500">📷 12:00</p>
      <p className="text-lg text-gray-800 font-semibold">하객 기념 촬영</p>
    </li>

    <li className="relative pl-6 text-left">
      <div className="absolute left-0 top-1 w-3 h-3 bg-pink-400 rounded-full"></div>
      <p className="text-sm text-gray-500">🍽️ 12:30</p>
      <p className="text-lg text-gray-800 font-semibold">피로연 및 식사</p>
    </li>
  </ul>

  <p className="mt-10 text-sm text-gray-400">* 일정은 현장 사정에 따라 변경될 수 있습니다.</p>
</section>
      {/* Section 4 - 장소 */}
      <section className="h-screen snap-start flex flex-col items-center justify-center bg-white px-8 text-center">
  <h2 className="text-2xl font-bold mb-4">📍 오시는 길</h2>
  <img
    src={`${process.env.PUBLIC_URL}/map.png`}
    alt="레터 이미지"
    className="w-full max-w-md mb-6 rounded-lg shadow-md mt-2"
  />

  <div className="flex gap-4">
    {/* 네이버지도 앱으로 열기 */}
    <a
      href="nmap://search?query=서울%20마포구%20창전로%2064"
      className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
    >
      네이버지도 앱
    </a>

    {/* 카카오맵 앱으로 열기 */}
    <a
      href="kakaomap://search?q=서울%20마포구%20창전로%2064"
      className="bg-yellow-400 text-black px-4 py-2 rounded shadow hover:bg-yellow-500"
    >
      카카오맵 앱
    </a>
  </div>
    <h2 className="text-2xl font-bold mb-4">🚗 주차 안내</h2>
  <p className="text-sm text-gray-500 mb-4">📍 서울 마포구 신수동 93-35</p>

  <div className="flex gap-6">
    {/* Tmap */}
    <a
      href="tmap://search?name=서울%20마포구%20신수동%2093-35"
      className="text-blue-600 text-3xl hover:scale-110 transition-transform"
    >
      🚘
      <p className="text-xs mt-1">Tmap</p>
    </a>

    {/* Naver Map */}
    <a
      href="nmap://search?query=서울%20마포구%20신수동%2093-35"
      className="text-green-600 text-3xl hover:scale-110 transition-transform"
    >
      🗺️
      <p className="text-xs mt-1">네이버</p>
    </a>

    {/* Kakao Map */}
    <a
      href="kakaomap://search?q=서울%20마포구%20신수동%2093-35"
      className="text-yellow-600 text-3xl hover:scale-110 transition-transform"
    >
      🧭
      <p className="text-xs mt-1">카카오</p>
    </a>
  </div>
</section>

      {/* Section 3 - 성경 말씀 */}
      <section className="h-screen snap-start flex flex-col items-center justify-center bg-pink-100 px-8">
        <h2 className="text-2xl font-bold mb-4">💒 성경 말씀</h2>
        <p className="text-lg text-center">
          “하나님이 짝지어 주신 것을 사람이 나누지 못할지니라” (마태복음 19:6)
        </p>
          <DailyVerse />
      </section>
    </div>
  );
}

export default App;