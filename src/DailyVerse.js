import React, { useEffect } from 'react';

function DailyVerse() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://dailyverses.net/get/random.js?language=niv';
    script.async = true;
    document.getElementById('daily-verse-container').appendChild(script);
  }, []);

  return (
    <section className="h-screen snap-start bg-white flex flex-col justify-center items-center text-center px-6">
      <h2 className="text-2xl font-bold text-pink-600 mb-4">📖 Daily Bible Verse</h2>
      <div
        id="daily-verse-container"
        className="text-gray-800 text-lg leading-relaxed"
      ></div>
    </section>
  );
}

export default DailyVerse;