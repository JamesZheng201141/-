import React, { useEffect, useState } from 'react';
import { DailyWisdomData, Language } from '../types';
import { getTranslation } from '../translations';

const LoadingLotus = () => (
  <div className="flex justify-center items-center py-20">
    <div className="animate-pulse text-zen-gold text-4xl">🪷</div>
  </div>
);

interface Props {
  lang: Language;
}

const getStaticWisdom = (lang: Language): DailyWisdomData => {
  const today = new Date().toISOString().split('T')[0];
  if (lang === 'en') {
    return {
      quote: "Form does not differ from Emptiness.",
      source: "Heart Sutra",
      reflection: "Let go of attachments to find true peace.",
      date: today
    };
  } else {
    return {
      quote: "色不异空。",
      source: "心经",
      reflection: "放下执着，方得自在。",
      date: today
    };
  }
};

const DailyWisdom: React.FC<Props> = ({ lang }) => {
  const [data, setData] = useState<DailyWisdomData | null>(null);
  const [loading, setLoading] = useState(true);
  const t = getTranslation(lang);

  useEffect(() => {
    const loadWisdom = () => {
      setLoading(true);
      const newData = getStaticWisdom(lang);
      setData(newData);
      setLoading(false);
    };

    loadWisdom();
  }, [lang]);

  if (loading) return <LoadingLotus />;

  return (
    <div className="flex flex-col h-full p-6 items-center justify-center text-center animate-[fadeIn_0.5s_ease-out]">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-stone-200 p-8 max-w-md w-full relative overflow-hidden">
        {/* Decorative Background Element */}
        <div className="absolute -top-10 -right-10 text-9xl text-stone-50 opacity-50 select-none pointer-events-none font-serif">
          禅
        </div>

        <h2 className="text-stone-400 text-sm tracking-[0.3em] uppercase mb-8">{t.daily_title}</h2>
        
        <div className="mb-8">
          <p className="font-serif text-2xl md:text-3xl text-zen-brown leading-relaxed font-bold">
            「{data?.quote}」
          </p>
          <p className="text-zen-gold mt-4 font-serif italic text-right">
            —— 《{data?.source}》
          </p>
        </div>

        <div className="bg-zen-bg rounded-lg p-5 text-stone-600 text-sm md:text-base leading-relaxed text-left border-l-4 border-zen-gold">
          <span className="block font-bold mb-2 text-stone-500 text-xs tracking-wider">{t.daily_source}</span>
          {data?.reflection}
        </div>

        <div className="mt-8 text-xs text-stone-400">
          {data?.date}
        </div>
      </div>
    </div>
  );
};

export default DailyWisdom;
