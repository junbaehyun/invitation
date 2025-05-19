import { jesusCalling } from './JesusCalling.js';
import dayjs from 'dayjs';

function DailyDevotional() {
  const today = dayjs().format('YYYY-MM-DD');
  const devotional = jesusCalling[today];

  if (!devotional) {
    return <p className="text-gray-500">📌 오늘의 묵상이 아직 준비되지 않았습니다.</p>;
  }

  return (
    <div className="bg-pink-50 rounded-xl p-6 max-w-xl shadow-md overflow-y-auto max-h-[80vh]">
    
      <p className="text-brownText whitespace-pre-line mb-4 leading-relaxed text-[17px]">
        {devotional.devotional}
      </p>

      <div className="mt-4 space-y-2">
        {devotional.verses.map((v, idx) => (
          <p key={idx} className="text-sm text-gray-700">
            <strong>{v.reference}:</strong> {v.text}
          </p>
        ))}
      </div>
    </div>
  );
}

export default DailyDevotional;