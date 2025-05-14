import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const messages = {
    "수빈": "사랑하는 수빈님, 그리스도의 사랑으로 당신을 초대합니다 💕",
    "지훈": "지훈 형제님, 주님의 평화가 함께하길 바랍니다 🙏",
    "하늘": "하늘 자매님, 함께하는 기쁨을 나누고 싶어요 ☁️",
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      
      {/* Section 1 - Input & Greeting */}
      <section className="h-screen flex flex-col items-center justify-center bg-pink-50 text-center snap-start p-6">
        <h1 className="text-3xl text-pink-600 font-bold mb-4">현준배 ♥ 숄판 결혼합니다</h1>
        <h2 className="text-xl text-gray-800 mb-2">이름을 입력해 주세요</h2>

        {!submitted ? (
          <>
            <input
              type="text"
              placeholder="예: 수빈"
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

        <audio autoPlay loop className="hidden">
          <source src="/music.mp3" type="audio/mpeg" />
        </audio>
      </section>

      {/* Section 2 - Main Wedding Info */}
      <section className="h-screen snap-start flex flex-col items-center justify-center bg-white px-8">
        <h2 className="text-2xl font-bold mb-4">📍 결혼식 장소</h2>
        <p className="text-lg">서울시 마포구 꿈이있는교회 (7월 12일 오전 11:30)</p>
      </section>

      {/* Section 3 - Gallery or Verse */}
      <section className="h-screen snap-start flex flex-col items-center justify-center bg-pink-100 px-8">
        <h2 className="text-2xl font-bold mb-4">💒 성경 말씀</h2>
        <p className="text-lg text-center">“하나님이 짝지어 주신 것을 사람이 나누지 못할지니라” (마태복음 19:6)</p>
      </section>

      {/* Add more sections as needed */}
    </div>
  );
}

export default App;