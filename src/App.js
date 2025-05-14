import React, { useState, useRef ,useEffect} from 'react';

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
    "수정": "사랑하는 수빈님, 그리스도의 사랑으로 당신을 초대합니다 💕",
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
  <div className="absolute bottom-24 right-8 bg-pink-100 text-pink-600 text-sm font-semibold px-3 py-1 rounded-full shadow-md animate-fadeInDown">
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

      {/* Section 2 - 장소 */}
      <section className="h-screen snap-start flex flex-col items-center justify-center bg-white px-8 text-center">
  <h2 className="text-2xl font-bold mb-4">📍 결혼식 장소</h2>
  <p className="text-lg mb-6"> 꿈이 있는 교회 (서울 마포구 창전로 64)</p>

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
</section>

      {/* Section 3 - 성경 말씀 */}
      <section className="h-screen snap-start flex flex-col items-center justify-center bg-pink-100 px-8">
        <h2 className="text-2xl font-bold mb-4">💒 성경 말씀</h2>
        <p className="text-lg text-center">
          “하나님이 짝지어 주신 것을 사람이 나누지 못할지니라” (마태복음 19:6)
        </p>
      </section>
    </div>
  );
}

export default App;