import React, { useState, useEffect } from 'react';
import { RecitationLog, Language } from '../types';
import { STATIC_SUTRAS } from '../constants';
import { getTranslation } from '../translations';

interface Props {
  lang: Language;
}

const getStaticEncouragement = (lang: Language): string => {
  if (lang === 'en') {
    return "Rejoice in your diligence!";
  } else {
    return "随喜赞叹！精进修行，功德无量。";
  }
};

const RecitationTracker: React.FC<Props> = ({ lang }) => {
  const [logs, setLogs] = useState<RecitationLog[]>([]);
  const [selectedSutraId, setSelectedSutraId] = useState<string>(STATIC_SUTRAS[0].id);
  const [showEncouragement, setShowEncouragement] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const t = getTranslation(lang);

  useEffect(() => {
    const savedLogs = localStorage.getItem('recitation_logs');
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }
  }, []);

  const handleCheckIn = () => {
    setLoading(true);
    const sutra = STATIC_SUTRAS.find(s => s.id === selectedSutraId);
    if (!sutra) return;

    // Save title in the current language context, or default to ID/Standard title for consistency
    // Here we save the localized title for display logs convenience
    const titleToSave = lang === 'en' ? (sutra.titleEn || sutra.title) : sutra.title;

    const newLog: RecitationLog = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      sutraTitle: titleToSave,
      timestamp: Date.now()
    };

    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    localStorage.setItem('recitation_logs', JSON.stringify(updatedLogs));

    // Get Static Encouragement
    const encouragement = getStaticEncouragement(lang);
    setShowEncouragement(encouragement);
    setLoading(false);
  };

  const getStreak = () => {
    if (logs.length === 0) return 0;
    const dates = new Set(logs.map(log => log.date.split('T')[0]));
    return dates.size;
  };

  const getTodayCount = () => {
    const today = new Date().toISOString().split('T')[0];
    return logs.filter(log => log.date.startsWith(today)).length;
  };

  return (
    <div className="h-full flex flex-col p-6 bg-zen-bg overflow-y-auto">
      {/* Header Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex flex-col items-center">
          <span className="text-stone-400 text-xs tracking-widest uppercase mb-1">{t.rec_streak}</span>
          <span className="font-serif text-4xl text-zen-gold font-bold">{getStreak()}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex flex-col items-center">
          <span className="text-stone-400 text-xs tracking-widest uppercase mb-1">{t.rec_today}</span>
          <span className="font-serif text-4xl text-zen-brown font-bold">{getTodayCount()}</span>
        </div>
      </div>

      {/* Action Area */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 mb-8">
        <h3 className="text-center font-serif text-lg text-stone-800 mb-4 font-bold">{t.rec_title}</h3>
        
        <div className="mb-6">
          <label className="block text-xs text-stone-400 mb-2 uppercase tracking-wide">{t.rec_select}</label>
          <select 
            value={selectedSutraId}
            onChange={(e) => setSelectedSutraId(e.target.value)}
            className="w-full bg-zen-bg border border-stone-200 text-stone-700 rounded-lg p-3 outline-none focus:border-zen-gold"
          >
            {STATIC_SUTRAS.map(s => (
              <option key={s.id} value={s.id}>
                {lang === 'en' ? (s.titleEn || s.title) : s.title}
              </option>
            ))}
          </select>
        </div>

        {!showEncouragement ? (
          <button
            onClick={handleCheckIn}
            disabled={loading}
            className={`w-full py-4 rounded-xl text-white font-bold tracking-widest shadow-md transition-all
              ${loading ? 'bg-stone-300 cursor-not-allowed' : 'bg-zen-gold hover:bg-amber-600 active:scale-[0.98]'}`}
          >
            {loading ? t.rec_btn_loading : t.rec_btn}
          </button>
        ) : (
          <div className="animate-[fadeIn_0.5s] bg-emerald-50 border border-emerald-100 rounded-xl p-5 text-center">
            <div className="text-emerald-600 text-2xl mb-2">🙏</div>
            <p className="text-emerald-800 font-serif font-medium leading-relaxed mb-4">
              {showEncouragement}
            </p>
            <button 
              onClick={() => setShowEncouragement(null)}
              className="text-xs text-emerald-600 font-bold hover:underline"
            >
              {t.rec_continue}
            </button>
          </div>
        )}
      </div>

      {/* History */}
      <div className="flex-1">
        <h3 className="text-stone-400 text-xs uppercase tracking-widest mb-4 px-2">{t.rec_history}</h3>
        <div className="space-y-3">
          {logs.slice(0, 10).map(log => (
            <div key={log.id} className="bg-white px-4 py-3 rounded-xl border border-stone-100 flex justify-between items-center text-sm">
              <span className="text-stone-700 font-medium">{log.sutraTitle}</span>
              <span className="text-stone-400 text-xs">
                {new Date(log.timestamp).toLocaleString(lang === 'zh' ? 'zh-CN' : 'en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
          {logs.length === 0 && (
             <div className="text-center text-stone-400 py-8 text-sm">{t.rec_empty}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecitationTracker;
