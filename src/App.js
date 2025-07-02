import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import DailyDevotional from './DailyDevotional';
import messages from './message';
import GallerySection from './components/GallerySection';


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

/*google sheet*/
  const [guestName, setGuestName] = useState('');
  const [guestInfo, setGuestInfo] = useState(null);
  const [isGuestSubmitted, setIsGuestSubmitted] = useState(false);




const [showJunText, setShowJunText] = useState(false);
const junRef = useRef(null);
const [showSholpanText, setShowSholpanText] = useState(false);
const sholpanRef = useRef(null);

const [name, setName] = useState('');
const trimmedName = name.trim();
const specialNames = ['김계원', '이정미', '임하경', '한수아', '박정민', '서상욱', '이수진','황승수','정지연','이지선','김다혜','정순이','박연의','김영현', '서상욱', '최보경', '서현석','권수영','김주형','류승현','민사욱','송정화','이주희',
  
  '조애',
  '염창열','정선미',
  
  '김해성', '정경도', '정환희',
  '대사관',
  '권용찬', '한재원', '김재현', '엄정훈', '장수녕',
  '이상인', '이순', '이득순', '구정애', '김영자', '김귀자', '장용순', '이정순', '김옥자', '김윤식',
  '오명숙', '김준', '유상목', '채용수', '홍영미', '임동식', '양선아', '양원철', '하연순', '김성자',
  '정인영', '김영애', '이형직', '송재연', '박철우', '안나영', '양성용', '김선경', '권순명', '유지혜', '구자천',
  '이성희', '김현희', '정지영', '이정민',
  '송미화', '이수진', '이지선', '강혜신',
  '황태성', '김고운', '안사랑', '박영수', '장윤정',
  '정혜숙', '정명란', '황승수', '정지연', '이정미', '차경덕', '김미영',
  '여정훈','조은화',

]
const isSpecialGuest = specialNames.includes(trimmedName);



const containerRef = useRef(null);



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
const messageText = selected?.text || `"${name}"님의 초청장이 준비 중입니다. 💌`;
const messageImage = selected?.image || null;

useEffect(() => {
  if (!submitted || !isSpecialGuest) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        console.log('✅ Jun section intersecting');

        // Delay text fade-in just like Sholpan
        setShowJunText(false);
        setTimeout(() => {
          setShowJunText(true);
        }, 800); // You can match delay to Sholpan
      } else {
        console.log('🔄 Jun section exited');
        setShowJunText(false);
      }
    },
    {
      threshold: 0.1,
    }
  );

  const target = junRef.current;

  if (target) observer.observe(target);

  return () => {
    if (target) observer.unobserve(target);
  };
}, [submitted, isSpecialGuest]);
useEffect(() => {
  if (!submitted || !isSpecialGuest) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      console.log('👀 Observing:', entry.isIntersecting, entry.target);
      if (entry.isIntersecting) {
        setShowSholpanText(true);
      } else {
        setShowSholpanText(false);
      }
    },
    {
      threshold: 0.1, // 더 민감하게 감지
    }
  );

  const target = sholpanRef.current;

  if (target) observer.observe(target);

  return () => {
    if (target) observer.unobserve(target);
  };
}, [submitted, isSpecialGuest]);

  

useEffect(() => {
  if (submitted && isSpecialGuest && containerRef.current) {
    setTimeout(() => {
      containerRef.current.scrollLeft = window.innerWidth;
    }, 100); // DOM 렌더 후 스크롤 적용
  }
}, [submitted, isSpecialGuest]);

  // ✅ 2. useEffect로 페이지 로드시 가운데로 스크롤 이동
  useEffect(() => {
    if (containerRef.current) {
      const screenWidth = window.innerWidth;
      containerRef.current.scrollLeft = screenWidth; // 가운데로 이동
    }
  }, []);
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

  
 const handleSubmit = async() => {
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

    // 🧠 Google Form 정보 가져오기
    try {
      const res = await fetch(
        'https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLghBfmh3lYZ7dD5zGuw1A_dvP2OB4y0yU9YWxG4UfD_xv9fXAJBaBb0czAI2JJd2vbjlM8ybmOt1bAQNOaZ8nay_pajRx8CVkOtSHRrQmhT9NiUkl9VeoliwV8KL2YSyOm_nLmvqwkCT8UKvnpITXOjUY2NfLsTIUF_iVAbaUEdfuVI_qWCEDpJoDpCPylbjTgxUO83iFt8SOZOQSyPpd34GCxbd93FGCM1rSGKKU2S8R2hf64NZvPw9FJlvMDHtK53ITsxXrDBSonxM8SAhrotb3-m1A&lib=Myy2aM2HK6QhKJyFJvzaxSgKPMwQAznpp'
      );
      const data = await res.json();

      const matched = data.find(
        (d) => d['성함을 입력해주세요.']?.trim() === trimmedName
      );

      if (matched) {
        setGuestInfo(matched);
      } else {
        setGuestInfo({ '함께오시는 분의 성함을 알 수 있을까요?': '정보 없음' });
      }
      setGuestName(trimmedName); // ✅ 대표자 이름 저장
    setIsGuestSubmitted(true); // ✅ 식사권 표시 트리거
    } catch (err) {
      console.error('구글 시트 가져오기 실패:', err);
      setGuestInfo({ '함께오시는 분의 성함을 알 수 있을까요?': '오류 발생' });
          setGuestName(trimmedName); // ✅ 실패해도 이름 저장
    setIsGuestSubmitted(true); // ✅ 실패해도 박스는 보여줌
    }
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
    <div className="h-[100dvh] h-screen w-full overflow-y-auto snap-y snap-mandatory scroll-smooth relative bg-paper bg-fixed bg-cover  font-myeongjo text-brownText">

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
  
  {/* section 0  배경 이미지 */}
  <img
    src={`${process.env.PUBLIC_URL}/img2.png`}
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
  <div className="absolute bottom-14 center bg-pink-100 text-pink-600 text-sm font-semibold px-3 py-1 rounded-full shadow-md z-40 animate-fadeInDown delay-[5000ms]">
    {getDday()}
  </div>

  {/* ↓ 아이콘 */}
  <div className="absolute bottom-4 animate-bounce text-pink-300 text-2xl z-40">↓</div>


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
          💌 초청장 확인하기
        </button>
      </>
    )}

    {/* 🎯 메시지 출력 영역 */}
  {submitted && (
<div className="mt-4 text-lg text-gray-700 px-2 text-left space-y-4 transition-all duration-1000 ease-out transform opacity-100 translate-y-0">
  
  {/* 🎯 이미지 출력 */}
  {messageImage && (
    <img
      src={`${process.env.PUBLIC_URL}${messageImage}`}
      alt={`${name}님 사진`}
      className="mx-auto w-full max-w-xs rounded-lg object-contain shadow-md"
    />
  )}

  {/* 🎯 메시지 텍스트 출력 */}
  <p className="whitespace-pre-wrap break-words">{displayedText || messageText}</p>
</div>
)}
  </div>
</section>

<div className={selected?.text ? "" : "hidden"}>
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
  
    <p className="mt-6 text-sm text-gray-400 text-left">* 식당 주차 ➡️ 교회 예배 ➡️ 다시 식당 이동 및 식사  <br /> * 주차가능 시간: 10:00 ~ 15:00 <br/> * 발렛파킹 비용은 사전에 지불 되었습니다. </p>
</section>


{/* Section - 예식 타임라인 */}
<section className="snap-start bg-white flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 py-16 min-h-screen text-center">
  <h2 className="text-3xl font-bold text-pink-500 mb-12 animate-fadeIn tracking-tight">
    예식 타임라인
  </h2>

  <ul className="relative w-full max-w-md space-y-14 before:content-[''] before:absolute before:top-0 before:left-[14px] before:w-0.5 before:h-full before:bg-pink-100">

    {/* 11:00 - 하객 입장 */}
    <li className="relative pl-10 animate-fadeInUp">
      <div className="absolute left-1.5 top-1 w-3 h-3 bg-pink-400 rounded-full border-2 border-white shadow"></div>
      <div className="text-left space-y-2">
        <p className="text-sm text-pink-600 font-medium flex items-center gap-1">
          🕰️ <span>11:00</span>
        </p>
        <h3 className="text-lg sm:text-xl font-bold text-gray-800">하객 입장 및 대기 공간 이용</h3>

        <div className="mt-4 bg-gray-50 p-5 rounded-xl shadow-sm">
          <h4 className="text-base font-semibold text-pink-600 mb-2">💒 예배 전 안내</h4>
          <p className="text-sm text-gray-700">
            예식은 <span className="font-semibold">11시 30분</span>부터 시작됩니다.
          </p>
          <ul className="mt-2 space-y-1 text-sm text-gray-700">
            <li>🪑 옆 건물 1층에서 <strong>다과</strong>와 <strong>영상 상영</strong></li>
            <li>🧃 <strong>비타민·피로회복제</strong> 제공</li>
            <li>☕ 카페에서 <strong>무료 음료 및 간식</strong> 제공 (입장 시 "신랑신부 하객입니다")</li>
            <li>🎥 대기 공간에서도 예식 영상 상영</li>
          </ul>
        </div>
      </div>
    </li>

    {/* 11:30 - 본 예식 */}
    <li className="relative pl-10 animate-fadeInUp">
      <div className="absolute left-1.5 top-1 w-3 h-3 bg-pink-400 rounded-full border-2 border-white shadow"></div>
      <div className="text-left space-y-2">
        <p className="text-sm text-pink-600 font-medium flex items-center gap-1">
          💒 <span>11:30</span>
        </p>
        <h3 className="text-lg sm:text-xl font-bold text-gray-800">예배식 결혼식 시작</h3>
        <ul className="mt-2 space-y-1 text-sm text-gray-700">
          <li>🎵 입장 및 찬송</li>
          <li>🙏 기도 및 성경봉독</li>
          <li>📖 설교 (황승수 목사님)</li>
          <li>💍 결혼서약 및 예물 교환</li>
          <li>👐 기도 및 안수</li>
          <li>🎤 축가 1: 서상욱 – 자작곡 외 1곡 (15분)</li>
          <li>🎶 축가 2: 신랑신부 감사인사 & 축복송 (5분)</li>
          <li>🕊️ 축도 및 퇴장</li>
        </ul>
      </div>
    </li>

    {/* 12:15 - 기념 촬영 */}
    <li className="relative pl-10 animate-fadeInUp">
      <div className="absolute left-1.5 top-1 w-3 h-3 bg-pink-400 rounded-full border-2 border-white shadow"></div>
      <div className="text-left space-y-2">
        <p className="text-sm text-pink-600 font-medium flex items-center gap-1">
          📷 <span>12:15</span>
        </p>
        <h3 className="text-lg sm:text-xl font-bold text-gray-800">하객 기념 촬영</h3>
      </div>
    </li>

    {/* 12:50 - 피로연 */}
    <li className="relative pl-10 animate-fadeInUp">
      <div className="absolute left-1.5 top-1 w-3 h-3 bg-pink-400 rounded-full border-2 border-white shadow"></div>
      <div className="text-left space-y-2">
        <p className="text-sm text-pink-600 font-medium flex items-center gap-1">
          🍽️ <span>12:50</span>
        </p>
        <h3 className="text-lg sm:text-xl font-bold text-gray-800">피로연 및 식사</h3>
      </div>
    </li>

  </ul>

  <p className="mt-10 text-sm text-gray-400 italic">* 일정은 사회자 서상욱님의 흥에 따라 변경될 수 있습니다 🎤</p>
</section>

<section className="snap-start bg-white flex flex-col items-center justify-start px-6 py-12 text-center min-h-screen">
  <h2 className="text-2xl font-bold text-pink-500 mb-8">고맙습니다.</h2>

  {/* 🎫 진짜 티켓 스타일 식사권 */}
  <div className="relative bg-white border border-pink-300 rounded-2xl shadow-lg max-w-md w-full px-6 py-8 text-left">
    
    {/* perforated 티켓 절취선 느낌 (가로선) */}
    <div className="absolute top-0 left-0 w-full h-4 border-t border-dashed border-pink-300 rounded-t-2xl"></div>
    <div className="absolute bottom-0 left-0 w-full h-4 border-b border-dashed border-pink-300 rounded-b-2xl"></div>

    {/* 상단 타이틀 */}
    <div className="justify-center flex items-center mb-4  text-center ">
      <span className="text-2xl">🎫</span>
      <h2 className="text-xl font-bold text-600 ml-2">서강8경/다이닝늘 식사권</h2>
    </div>

    {/* 예약 정보 */}
    <p className="text-lg font-semibold text-gray-800 mb-2">
      특별히 초청받으신 분: <span className="text-pink-600">{name}</span>
    </p>

    {/* 식사 정보 박스 */}
   {isGuestSubmitted && (
        <>
          

        {guestInfo && (
  <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 space-y-2 text-sm">

    {/* 참석 여부 */}
    <p>
      <strong>✅ 참석 여부:</strong>{' '}
      {guestInfo['성함을 입력해주세요.'] ? (
        <span className="text-green-600 font-medium">작성 완료</span>
      ) : (
        <a
          href="https://docs.google.com/forms/d/1T74BPurt7zwJpKC88eKwCThGynW9n4IVtmSYo-503uQ/edit"
          className="text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          참석 여부를 작성해주세요
        </a>
      )}
    </p>

    {/* ✅ 참석자일 경우만 아래 표시 */}
    {guestInfo['성함을 입력해주세요.'] && (
      <>
        <p>
          <strong>식사 여부:</strong>{' '}
          {guestInfo['Q: 귀한시간 내셔서 멀리서 오셨는데, 저희가 식사 대접할 기회는 주실 꺼죠?   ✨']
            ? guestInfo['Q: 귀한시간 내셔서 멀리서 오셨는데, 저희가 식사 대접할 기회는 주실 꺼죠?   ✨']
            : '식사 불참'}
        </p>

        <p>
          <strong>식사권 ID:</strong>{' '}
          {guestInfo['연락처를 입력해주세요.']
            ? guestInfo['연락처를 입력해주세요.']
            : '정보 없음'}
        </p>

        <p>
          <strong>🍴 동행자:</strong>{' '}
          {guestInfo['함께오시는 분의 성함을 알 수 있을까요?']
            ? guestInfo['함께오시는 분의 성함을 알 수 있을까요?']
            : '없음'}
        </p>

        
      </>
    )}
    <p>
          <strong>📋 메뉴:</strong> 정찬 코스 (Full Course)
        </p>

        <p className="flex justify-between items-center">
          <span>
            <strong>💳 식사권가:</strong> Special voucher
          </span>
          <span className="text-green-600 font-medium">(예약 완료)</span>
        </p>
  </div>
)}
        </>
      )} 

  
  </div>
  {/* test*/}
  
  {/* 하단 안내 */}
  <p className="mt-6 text-sm text-gray-400 text-left">
    * 본 예식에서 별도의 종이 식사권은 없습니다. 레스토랑 입장시 본 식사권을 제시해 주세요.  <br></br>* 본 예식에서는 알러지 여부, 베지테리안, 비건, 글루틴프리 등 아래 작성해주시는 예약 정보로 인근 '서강8경' 또는 '다이닝늘' 식당으로 7월 6일 최종 확정되어 감사한 마음을 담아 식사가 준비됩니다. <span className="text-gray-500 font-medium ">7월 5일까지</span> 꼭 참석 여부를 알려주세요 😊 이후 일정이 확정된 경우, 01071978438로 연락 부탁드립니다☺️
    
  </p>
  {/* 버튼 */}
    <a
      href="https://docs.google.com/forms/d/1T74BPurt7zwJpKC88eKwCThGynW9n4IVtmSYo-503uQ/edit"
      target="_blank"
      rel="noopener noreferrer"
      className="mt-5 inline-block bg-gradient-to-r from-pink-500 to-pink-400 text-white text-sm px-6 py-2 rounded-full shadow hover:opacity-90 transition "
    >
      ✍️ 참석 여부 확정하기
    </a>
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






{/* ✅ 새로운 Vision & Prayer Section */}
{submitted && isSpecialGuest && (
     <section
      className="h-screen snap-start overflow-x-auto snap-x snap-mandatory scroll-smooth bg-white relative"
      ref={containerRef}
    >
      {/* 안내 텍스트 */}
      

      <div className="flex w-[300vw] h-screen">
{/* Sholpan Testimony Section */}
<div
  ref={sholpanRef}
  className="w-screen h-screen snap-start relative overflow-hidden flex items-center justify-center"
>
  {/* Background Image with Blur */}
<img
  src={`${process.env.PUBLIC_URL}/sholpan.png`}
  alt="Sholpan"
  className={`absolute inset-0 w-full h-full object-cover z-10 transition-all duration-[6000ms] ease-in-out 
    ${showSholpanText ? 'opacity-60 blur-md scale-110' : 'opacity-100 blur-0 scale-100'}
  `}
/>

  {/* Text content (fade in) */}
  <div
    className={`absolute inset-0 flex items-center justify-center z-20 transition-opacity duration-[2000ms] ease-in-out delay-[800ms] ${
      showSholpanText ? 'opacity-100' : 'opacity-0'
    }`}
  >
  <div className="bg-white/50 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-md text-left text-sm leading-relaxed text-gray-800">
      <h2 className="text-xl font-semibold text-center mb-4">Sholpan's Testimony</h2>
      <p className="whitespace-pre-wrap">
      "어렸을때 그림으로된 성경책을 여러번 읽었어요. 그중에 이삭의 이야기는 인상깊었어요. '어떻게 아들을 내어줄 수 있을까? 얼마나 힘들었을까?', 추후 복음을 알게 되었을 때, 하나님께선 어떻게.. 예수님을 내어주실 수 있었을까?.. <br />  
      Hello! My name is Sholpan, and I’m from a small village in Kazakhstan 😁.

      When I was a child, a relative told me we were sinful. Later, she invited our family to church. I noticed the people there were full of joy and kindness. My sister and I started attending regularly and joined summer camps each year. We grew up among believers.

      In school, we were bullied for being Christians. It continued even in college and university. But I found a new family in Christ — full of joy, unity, and love.

      In 2005, I began serving in children’s camps and church worship. Later in Almaty, I served in the worship team and youth group. I also joined OM’s Silk Road outreach many times.

      I worked with Operation Mercy, then prayed to serve abroad. God opened two doors: England or Kenya. I chose Kenya by faith. God provided everything as promised (Genesis 22:14).

      I served in Kenya for a year. Then COVID came, and God called me back to Kazakhstan. He again provided home and work. I now serve women in difficult marriages, sharing the hope of God’s love.

      </p>
    </div>
  </div>
</div>
        {/* Center - Vision & Prayer */}
        
        <div className="w-screen h-screen snap-start flex flex-col items-center justify-center bg-[#FFF3F7] px-6 text-center space-y-6 overflow-y-auto">
        <div className="absolute top-4 w-full text-center text-xs text-gray-400 z-50">
        ← 좌우로 넘기면 신랑/신부 소개가 나옵니다 →
      </div>
          <h2 className="text-2xl font-bold text-orange-500 mt-4">🎯 Vision & Prayer</h2>
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
        </div>

{/* Jun's Testimony Section */}
<div
  ref={junRef}
  className="w-screen h-screen snap-start relative overflow-hidden flex items-center justify-center"
>
  {/* Fullscreen background image */}
  <img
    src={`${process.env.PUBLIC_URL}/junbae.png`}
    alt="Junbae"
    className={`absolute inset-0 w-full h-full object-cover z-10 transition-all duration-[5000ms] ease-in-out 
      ${showJunText ? 'opacity-60 blur-md scale-110' : 'opacity-100 blur-0 scale-100'}
    `}
  />
   
<div
  className={`absolute inset-0 z-20 transition-opacity duration-[2000ms] ease-in-out delay-[800ms] 
    ${showJunText ? 'opacity-100' : 'opacity-0'}
    flex flex-col items-center justify-start overflow-y-auto snap-y snap-mandatory gap-y-10`}
>
    {/* Slide 1 */}
    <div className="w-full h-screen snap-start flex items-center justify-center px-8">
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-md text-left text-sm text-gray-800 leading-relaxed">
        <h2 className="text-xl font-semibold text-center mb-4">Jun's Testimony</h2>
        <p className="whitespace-pre-wrap">
          어린 시절부터 예수님을 알지 못하고 살아왔습니다. 어머니의 희생, 삶에 대한 허무와 방황 속에서, 저는 끊임없이 ‘나는 누구인지', '왜 살아야 하는지' 를 고민했습니다. '많이 힘들지? ' 어깨를 다독여 주었던 친구는 제게 '교회 가볼래?' 고등학교 때 처음 교회에 갔지만, 하나님은 보이지 않아 믿지 않을 것을 선택했습니다.
<br />< br />
       삶이 바닥에 닿았던 23살, '지금 1도의 변화가 훗날 큰 전화점이 될 거야' 저는 그분의 인도로 교회를 다니기 시작했습니다. ‘존재하신다고 전제하고 1년만 다녀보자’는 마음으로, '하나님, 저는 당신이 보이지 않아서 믿지 않기로 선택했어요. 그런데 이번엔 보이지 않지만 당신께서 이 기도를 들으실 것을 믿으며 기도해요. 만약 정말 주님께서 이 기도를 듣고 계신다면, 주님께서 도와주세요. 보이지 않는 사실을 볼 수 있게.' 그런데 우연의 일치라고 경험주의로 일축 하기엔 다 설명할 수 없는 무언가. '어 정말 인가? 정말 내 기도를 듣고 계신가? '...
        </p>
      </div>
    </div>

    {/* Slide 2 */}
    <div className="w-full h-screen snap-start flex items-center justify-center px-8">
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-md text-left text-sm text-gray-800 leading-relaxed">
        <h2 className="text-xl font-semibold text-center mb-4">말씀을 읽게 되다</h2>
        <p className="whitespace-pre-wrap">
         그렇게 저는 멋진 형님들과 누나들, 건강한 공동체 가운데서 믿음을 찾아갔습니다. 그러던 중 필리핀에서 우연히 참석했던 예배에서 목사님께선 설교 시간에 기대했던 말씀은 전하지 않으시고 새번역 성경책을 나눠 주시고 각자 읽게 하였습니다. 성경책은 목사님만 이해할 수 있다고 생각했습니다. 그런데 말씀이 이해가 되고 내용이 이해가 됐고 흐르는 눈물이 오랜시간 멈추지 않아 흐느끼던 제 머리에 안수하며 알 수 없는 언어로 기도해주셨었습니다. 
        그날 부터 저는 매일 성경책을 읽으며 하나님의 사랑을 알아갔습니다.
        </p>
      </div>
    </div>
{/* Slide 3 */}
    <div className="w-full h-screen snap-start flex items-center justify-center px-8">
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-md text-left text-sm text-gray-800 leading-relaxed">
        <h2 className="text-xl font-semibold text-center mb-4">복음을 알게되다</h2>
        <p className="whitespace-pre-wrap">
          호주 신학교를 준비하며 성경을 깊이 읽고 레포트를 쓰는 과정에서, 하나님께서 저 같은 죄인을 위해 당신의 아들을 십자가에 내어주셨다는 사실이 이야기로가 아니라 실제로 다가왔습니다. <br /> 이후 방글라데시 로힝야 난민촌에서 1년간 섬기며, 복음 외에는 희망이 없는 사람들 속에서 예수님의 마음과 시선이 머무를 곳을 구하며 그분의 손과 발이 되는 삶을 연습했습니다.

        </p>
         </div>
    </div>        
    {/* Slide 3 */}
    <div className="w-full h-screen snap-start flex items-center justify-center px-8">
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-md text-left text-sm text-gray-800 leading-relaxed">
        <h2 className="text-xl font-semibold text-center mb-4">삶으로 전하는 복음</h2>
        <p className="whitespace-pre-wrap">
          카자흐스탄 단기선교를 통해 <br />“하나님의 사랑을 삶으로 살아내는 것, 그 삶이 누군가에게 복음이 되는 선교적 삶”을 배웠습니다. <br /> <br />그리고 오늘,<br /> 그 사랑을 깨달아 나의 삶으로 살아가려 합니다.
<br /><br />
“당신께선 수 천년을 나를 향해 걸어오셨습니다. 십자가에 달리시기까지, 영원한 죽음에서 나를 구원하신 그 피로, 이제는 저도 그 사랑을 따라 걷습니다.”
        </p>
      </div>
    </div>
  </div>
</div>

  {/* Text content */}
  {/* <div
    className={`absolute inset-0 flex items-center justify-center z-20 transition-opacity duration-[2000ms] ease-in-out delay-[800ms] 
      ${showJunText ? 'opacity-100' : 'opacity-0'}
    `}
  >
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-md text-left text-sm leading-relaxed text-gray-800">
      <h2 className="text-xl font-semibold text-center mb-4">Jun's Testimony</h2>
      <p className="whitespace-pre-wrap">

      어린 시절부터 예수님을 알지 못하고 살아왔습니다. 어머니의 희생, 삶에 대한 허무와 방황 속에서, 저는 끊임없이 ‘나는 누구인지', '왜 살아야 하는지' 를 고민했습니다. 고등학교 때 처음 교회에 갔지만, 하나님은 보이지 않아 믿지 않을 것을 선택했습니다.

      그러나 삶이 바닥에 닿았던 23살, 다시 교회를 다니기 시작했습니다. ‘존재하신다고 전제하고 1년만 다녀보자’는 마음으로, 기도하고 말씀을 들으며 하나님을 구했습니다.

      호주 신학교를 준비하며 성경을 깊이 읽고 레포트를 쓰는 과정에서, 하나님께서 저 같은 죄인을 위해 당신의 아들을 십자가에 내어주셨다는 사실이 이야기로가 아니라 실제로 다가왔습니다.

이후 방글라데시 로힝야 난민촌에서 1년간 섬기며, 복음 외에는 희망이 없는 사람들 속에서 예수님의 마음과 시선이 머무를 곳을 구하며 그분의 손과 발이 되는 삶을 연습했습니다.

카자흐스탄 단기선교를 통해 “하나님의 사랑을 삶으로 살아내는 것, 그 삶이 누군가에게 복음이 되는 선교적 삶”을 배웠습니다. 그리고 오늘, 그 사랑을 깨달아 나의 삶으로 살아가려 합니다.

“당신께선 수 천년을 나를 향해 걸어오셨습니다. 십자가에 달리시기까지, 영원한 죽음에서 나를 구원하신 그 피로, 이제는 저도 그 사랑을 따라 걷습니다.”

    </p>
    </div>
  </div>
</div> */}
  
      </div>
    </section>



)}
<section className="min-h-screen snap-start bg-[#FFF7F0] flex  px-1 py-12 ">
<GallerySection />


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

<p>카작에서 보살펴 주시고 섬겨주셨으며 결혼을 위해 합력하여 선을 이뤄 주신 분들 :<br />
서현석 선생님, 공재영 선생님, 염창렬 선생님 </p>

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
김다혜전도사님, 용찬형제, 정훈형제, 재현형제 수녕형제, 재원형제,</p>

<p>사회자:<br />
준비된 사회자 - 서상욱 </p>

<p>처음 하나님께로 인도해 주신 분:<br />
제충만 형님</p>

<p>살며 아름다운 첫 믿음의 공동체를 경험케 해주신 형님 누님:<br />
호길, 진영, 주희, 충만, 사욱, 정화</p>

<p>준배 사람 만들어 주신 분들:<br />
김향래 어머님, 김주형 목사님</p>

<p>기도로 빚어 주신 분들:<br />
진기현 목사님, 꿈교회 공동체, 카자흐스탄 선생님들 </p>

<p>방글라데시 난민촌에서 예수님의 손과 발이 되는 삶을 가르쳐 주신 분:<br />
김해성 목사님</p>


<p>청년부 리더로 결혼 준비도 함께 해주신:<br />
예레미야 온맘다혜 전도사님</p>

<p>언제나 응원해주시고 지지해 주시는:<br />
이수진 목사님, 이지선 사모님</p>

<p> 결혼생활의 사실과 실체 가운데 실질적 조언을 주시고 함께 기도해 주신 분들: <br /> 
서상욱 최보경 형님 누나</p>

<p>🔥ball 친구들:<br />
재의, 용석, 용현, 윤석, 승환, 성한, 석훈, 동영, 대희, 기환</p>

<p>꿈교회 남자청년부 브로멘스 형제들:<br />
정훈, 수보, 수빈, 순녕, 재원, 재현<br />
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
   
    
💌 감사한 마음 담아: 준배 & 숄판 올림  </p>
  
    
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
</div>
 
    </div>
  );
}

export default App;