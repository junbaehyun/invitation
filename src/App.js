import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import DailyDevotional from './DailyDevotional';

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
  const [now, setNow] = useState(dayjs());

  // 실시간 시간 갱신
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
      <section className="h-screen flex flex-col items-center justify-start text-center snap-start pt-6">

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
<section className="h-screen snap-start bg-white flex flex-col items-center justify-center text-center px-6 py-10 space-y-6 ">
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

      {/* Section 3 - 성경 말씀 */}
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

{/* 감사의 말씀 섹션 */}
<section className="min-h-screen snap-start bg-[#FFF7F0] flex flex-col items-center justify-center px-6 py-12 text-center text-brownText">
  <h2 className="text-2xl font-bold text-orange-500 mb-6">💝 감사의 말씀</h2>
  
  <p className="text-sm text-gray-700 leading-relaxed max-w-xl mb-8">
    결혼 준비로 오락가락하는 마음으로 힘들었지만,<br/>
    포기하지 않고 함께 기도하며 인내해 주신 분들께 진심으로 감사드립니다.
  </p>

  <div className="text-sm text-left max-w-xl space-y-4 bg-white p-6 rounded-xl shadow-md">
    <p><strong>기도로 함께해주신 분들:</strong> 황승수 목사님, 이지선 사모님, 임수경 선교사님, 한수아 선교사님</p>
    <p><strong>디자인 및 제작 지원:</strong> 박은옥 전도사님 (종이 청첩장, 예복 지원)</p>
    <p><strong>스타일링 지원:</strong> 집사님 (메이크업, 스타일)</p>
    <p><strong>축가:</strong> 멀리서 와주신 멋진 사욱형님 🎤</p>
    <p><strong>사회:</strong> 정민아... 호주 티켓 사는 거 진심이야...? 🎤</p>
    <p><strong>신앙의 여정:</strong> 제충만 형님, 신성교회 형제 자매들 (호길, 진영)</p>
    <p><strong>양육:</strong> 김향래 어머님, 김주형 목사님</p>
    <p><strong>기도로 빚어주신 분들:</strong> 진기현 목사님, 꿈교회 공동체</p>
    <p><strong>방글라데시 난민촌 사역:</strong> 김해성 목사님</p>
    <p><strong>결혼 준비 도우미:</strong> 다혜 전도사님 (예레미야 온맘)</p>
    <p><strong>브로맨스 형제들:</strong> 정훈, 수보, 수빈, 순녕, 재원</p>
    <p><strong>아름다운 상을 나눠주신 선생님들:</strong> 효진쌤, 재림쌤, 혜윤쌤, 시은쌤</p>
    <p><strong>전국 농협 통역 어벤져스:</strong> 신윤희 팀장님, 유진 강사님, 세진님, 은화 선배님, 정훈 선배님</p>
    <p><strong>Special thanks to:</strong> Shakir 🌏</p>
    <p><strong>그리고 말하지 못했지만, 뒤에서 지지해주신 모든 분들께…</strong><br/>진심으로 감사합니다. 여러분이 있었기에 오늘의 우리가 있습니다.</p>
  </div>

  <p className="text-xs text-gray-500 mt-6 italic">
    이 모든 것을 주관하신 분: <strong>하나님</strong>
  </p>

  <p className="text-sm mt-4 text-gray-400">
    💌 감사한 마음 담아: 준배 & 숄판 올림 <br/>
    🐞 오류 문의: <a href="tel:01071978438" className="underline">010-7197-8438</a>
  </p>
</section>
    </div>
  );
}

export default App;