import React, { useState, useEffect } from 'react';
import { View, Language } from './types';
import DailyWisdom from './components/DailyWisdom';
import SutraLibrary from './components/SutraLibrary';
import RecitationTracker from './components/RecitationTracker';
import ZenChat from './components/ZenChat';
import Profile from './components/Profile';
import { getTranslation } from './translations';

// Icons
const IconWisdom = ({ active }: { active: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={active ? 2 : 1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
);

const IconLibrary = ({ active }: { active: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={active ? 2 : 1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

const IconRecitation = ({ active }: { active: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={active ? 2 : 1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
  </svg>
);

const IconChat = ({ active }: { active: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={active ? 2 : 1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
  </svg>
);

const IconMy = ({ active }: { active: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={active ? 2 : 1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DAILY);
  const [lang, setLang] = useState<Language>('zh');
  const t = getTranslation(lang);

  // Initialize state from local storage
  useEffect(() => {
    const savedLang = localStorage.getItem('app_lang');
    if (savedLang === 'en' || savedLang === 'zh') {
      setLang(savedLang);
    }
  }, []);

  // Persistence
  useEffect(() => {
    localStorage.setItem('app_lang', lang);
  }, [lang]);

  const renderContent = () => {
    switch (currentView) {
      case View.DAILY: return <DailyWisdom lang={lang} />;
      case View.LIBRARY: return <SutraLibrary lang={lang} />;
      case View.RECITATION: return <RecitationTracker lang={lang} />;
      case View.CHAT: return <ZenChat lang={lang} />;
      case View.MY: 
        return <Profile lang={lang} setLang={setLang} />;
      default: return <DailyWisdom lang={lang} />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-stone-50 shadow-2xl relative font-sans">
      {/* Status Bar Imitation / Header */}
      {/* Added top padding handling for Safe Area Inset (Notch) */}
      <div className="bg-zen-brown text-stone-100 pt-[max(1rem,env(safe-area-inset-top))] pb-4 px-4 text-center shadow-md z-20">
        <h1 className="font-serif font-bold text-lg tracking-widest">
          {lang === 'zh' ? '般若伴侣' : 'Prajna Companion'}
        </h1>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative z-10">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      {/* Replaced 'pb-safe' with explicit env(safe-area-inset-bottom) for better WebView compatibility */}
      <nav className="bg-white border-t border-stone-200 text-[10px] md:text-xs text-stone-500 pb-[env(safe-area-inset-bottom)] z-30">
        <div className="grid grid-cols-5 h-16">
          <button 
            onClick={() => setCurrentView(View.DAILY)}
            className={`flex flex-col items-center justify-center space-y-1 transition-colors ${currentView === View.DAILY ? 'text-zen-brown' : 'hover:text-stone-700'}`}
          >
            <IconWisdom active={currentView === View.DAILY} />
            <span className="scale-90 transform">{t.nav_daily}</span>
          </button>
          
          <button 
            onClick={() => setCurrentView(View.LIBRARY)}
            className={`flex flex-col items-center justify-center space-y-1 transition-colors ${currentView === View.LIBRARY ? 'text-zen-brown' : 'hover:text-stone-700'}`}
          >
            <IconLibrary active={currentView === View.LIBRARY} />
            <span className="scale-90 transform">{t.nav_library}</span>
          </button>

          <button 
            onClick={() => setCurrentView(View.RECITATION)}
            className={`flex flex-col items-center justify-center space-y-1 transition-colors ${currentView === View.RECITATION ? 'text-zen-brown' : 'hover:text-stone-700'}`}
          >
            <IconRecitation active={currentView === View.RECITATION} />
            <span className="scale-90 transform">{t.nav_recitation}</span>
          </button>

          <button 
            onClick={() => setCurrentView(View.CHAT)}
            className={`flex flex-col items-center justify-center space-y-1 transition-colors ${currentView === View.CHAT ? 'text-zen-brown' : 'hover:text-stone-700'}`}
          >
            <IconChat active={currentView === View.CHAT} />
            <span className="scale-90 transform">{t.nav_chat}</span>
          </button>

          <button 
            onClick={() => setCurrentView(View.MY)}
            className={`flex flex-col items-center justify-center space-y-1 transition-colors ${currentView === View.MY ? 'text-zen-brown' : 'hover:text-stone-700'}`}
          >
            <IconMy active={currentView === View.MY} />
            <span className="scale-90 transform">{t.nav_my}</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default App;