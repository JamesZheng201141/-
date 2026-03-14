import React from 'react';
import { Language } from '../types';
import { getTranslation } from '../translations';

interface Props {
  lang: Language;
  setLang: (l: Language) => void;
}

const Profile: React.FC<Props> = ({ lang, setLang }) => {
  const t = getTranslation(lang);

  return (
    <div className="h-full bg-zen-bg overflow-y-auto">
      {/* Header Profile Card */}
      <div className="bg-zen-brown text-stone-100 p-8 pt-10 rounded-b-[2.5rem] shadow-md mb-6 relative">
        
        {/* Language Toggle Top-Right */}
        <button 
          onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
          className="absolute top-6 right-6 flex items-center gap-1.5 bg-black/20 hover:bg-black/30 active:scale-95 text-stone-200 text-xs font-medium px-3 py-1.5 rounded-full transition-all border border-white/10 backdrop-blur-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
          </svg>
          {lang === 'zh' ? 'English' : '中文'}
        </button>

        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-stone-200 rounded-full border-4 border-zen-gold/50 flex items-center justify-center text-4xl mb-4 shadow-lg overflow-hidden">
             <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=e6e6e6`} alt="Avatar" className="w-full h-full" />
          </div>
          <h2 className="text-xl font-bold tracking-wide">Prajna User</h2>
        </div>
      </div>

      <div className="px-6 space-y-6 pb-20">
        
        {/* Settings / Info Section */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-100">
          <h3 className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-4 ml-1">{t.my_about}</h3>
          
          <div className="text-sm text-stone-600 space-y-3 p-2">
            <div className="flex justify-between items-center border-b border-stone-100 pb-3">
              <span>{t.my_version}</span>
              <span className="bg-stone-100 px-2 py-0.5 rounded text-xs text-stone-500">Latest</span>
            </div>
            <p className="font-serif italic text-center pt-2 text-stone-500">"{t.my_quote}"</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-stone-300 text-[10px] pt-4">
           <p>© 2024 Prajna Companion. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
