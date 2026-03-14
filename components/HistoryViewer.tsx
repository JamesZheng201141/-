import React, { useState, useEffect } from 'react';
import { HistoryItem, Language } from '../types';
import { getTranslation } from '../translations';

interface Props {
  lang: Language;
}

const getStaticHistory = (lang: Language): HistoryItem => {
  if (lang === 'en') {
    return {
      title: "Bodhidharma",
      period: "5th Century",
      content: "Bodhidharma brought Zen to China..."
    };
  } else {
    return {
      title: "达摩东渡",
      period: "南北朝时期",
      content: "菩提达摩从印度渡海来到中国，将禅宗心法带入中土，被尊为中国禅宗初祖。"
    };
  }
};

const HistoryViewer: React.FC<Props> = ({ lang }) => {
  const [historyItem, setHistoryItem] = useState<HistoryItem | null>(null);
  const [loading, setLoading] = useState(false);
  const t = getTranslation(lang);

  const loadHistory = () => {
    setLoading(true);
    const item = getStaticHistory(lang);
    setHistoryItem(item);
    setLoading(false);
  };

  useEffect(() => {
    // Refresh history when language changes or if not present
    loadHistory();
  }, [lang]);

  return (
    <div className="flex flex-col items-center h-full">
      {loading && !historyItem ? (
         <div className="flex-1 flex items-center justify-center py-20">
             <div className="text-zen-gold animate-pulse">Scanning ancient texts...</div>
         </div>
      ) : (
        <div className="w-full bg-white p-6 md:p-8 rounded-lg shadow-sm border border-stone-200 relative flex flex-col animate-[fadeIn_0.5s]">
          <div className="mb-6 border-b border-stone-100 pb-4">
             <span className="inline-block bg-zen-bg text-zen-gray text-xs px-2 py-1 rounded mb-2 tracking-wider">
               {historyItem?.period}
             </span>
             <h3 className="text-2xl font-serif text-stone-800 font-bold leading-tight">
               {historyItem?.title}
             </h3>
          </div>

          <div className="flex-1">
            <p className="text-stone-600 leading-loose text-justify font-serif text-sm md:text-base">
              {historyItem?.content}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-dashed border-stone-200 text-center">
            <button 
              onClick={loadHistory}
              disabled={loading}
              className={`px-6 py-2 rounded-full border border-zen-gold text-zen-gold hover:bg-zen-gold hover:text-white transition-all text-sm font-medium
                ${loading ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
               Next Story
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryViewer;
