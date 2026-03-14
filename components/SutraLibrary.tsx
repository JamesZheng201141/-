import React, { useState, useEffect } from 'react';
import { STATIC_SUTRAS } from '../constants';
import { Sutra, Language } from '../types';
import { getTranslation } from '../translations';
import HistoryViewer from './HistoryViewer';

interface Props {
  lang: Language;
}

type Tab = 'SUTRA' | 'HISTORY';

const SutraLibrary: React.FC<Props> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<Tab>('SUTRA');
  const [selectedSutra, setSelectedSutra] = useState<Sutra | null>(null);
  const [fontSize, setFontSize] = useState(18);
  
  const t = getTranslation(lang);

  const getSutraTitle = (sutra: Sutra) => lang === 'en' ? (sutra.titleEn || sutra.title) : sutra.title;
  const getSutraDesc = (sutra: Sutra) => lang === 'en' ? (sutra.shortDescriptionEn || sutra.shortDescription) : sutra.shortDescription;
  const getSutraContent = (sutra: Sutra) => lang === 'en' ? (sutra.contentEn || sutra.content) : sutra.content;

  // Handle native Android back button for reader view
  useEffect(() => {
    if (selectedSutra) {
      const handleBack = (e: PopStateEvent) => {
        e.preventDefault();
        setSelectedSutra(null);
      };
      // Push state so back button closes reader instead of app
      window.history.pushState({ view: 'reader' }, '');
      window.addEventListener('popstate', handleBack);
      
      return () => {
        window.removeEventListener('popstate', handleBack);
      };
    }
  }, [selectedSutra]);

  const closeReader = () => {
    // Go back in history to remove the pushed state, which triggers popstate or just syncs history
    if (window.history.state?.view === 'reader') {
      window.history.back();
    } else {
      setSelectedSutra(null);
    }
  };

  // Reader View (Sutra selected)
  if (selectedSutra) {
    const displayTitle = getSutraTitle(selectedSutra);
    const displayContent = getSutraContent(selectedSutra);

    return (
      <div className="flex flex-col h-full bg-zen-paper overflow-hidden animate-[fadeIn_0.3s_ease-out]">
        {/* Reader Header */}
        <div className="flex items-center justify-between p-4 border-b border-stone-200 bg-white shadow-sm z-10 pt-[max(1rem,env(safe-area-inset-top))]">
          <button 
            onClick={closeReader}
            className="text-stone-500 hover:text-zen-brown transition-colors p-2 -ml-2"
          >
            <span className="text-lg">←</span> {t.lib_back}
          </button>
          <span className="font-serif font-bold text-zen-brown truncate px-2 text-sm md:text-base max-w-[50%]">
            {displayTitle}
          </span>
          <div className="flex space-x-2">
            <button onClick={() => setFontSize(Math.max(14, fontSize - 2))} className="w-8 h-8 rounded-full border border-stone-300 text-stone-600 flex items-center justify-center text-xs bg-white active:bg-stone-100">A-</button>
            <button onClick={() => setFontSize(Math.min(32, fontSize + 2))} className="w-8 h-8 rounded-full border border-stone-300 text-stone-600 flex items-center justify-center text-sm bg-white active:bg-stone-100">A+</button>
          </div>
        </div>

        {/* Reader Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 scroll-smooth pb-safe">
          <div className="max-w-2xl mx-auto">
            {/* Original Text */}
            <div 
              style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }}
              className={`font-serif text-stone-800 mb-8 whitespace-pre-wrap tracking-wide ${lang === 'zh' ? 'text-justify' : 'text-left'}`}
            >
              {displayContent}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Library View
  return (
    <div className="h-full flex flex-col bg-zen-bg">
      {/* Header & Tabs */}
      <div className="p-4 bg-zen-bg sticky top-0 z-10 pb-2 pt-4">
        <h2 className="text-2xl font-serif font-bold text-zen-brown mb-4 px-2 pt-2">{t.lib_title}</h2>
        <div className="flex p-1 bg-stone-200 rounded-lg">
          <button 
            onClick={() => setActiveTab('SUTRA')}
            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'SUTRA' ? 'bg-white text-zen-brown shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
          >
            {t.lib_tab_sutra}
          </button>
          <button 
            onClick={() => setActiveTab('HISTORY')}
            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'HISTORY' ? 'bg-white text-zen-brown shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
          >
            {t.lib_tab_history}
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 pt-0">
        {activeTab === 'SUTRA' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-20">
            {STATIC_SUTRAS.map((sutra) => (
              <div 
                key={sutra.id}
                onClick={() => setSelectedSutra(sutra)}
                className="bg-white p-5 rounded-xl shadow-sm border border-transparent hover:border-zen-gold transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif text-lg font-bold text-stone-800 group-hover:text-zen-gold transition-colors">
                    {getSutraTitle(sutra)}
                  </h3>
                  <span className="text-stone-300 text-xl group-hover:text-zen-gold">📖</span>
                </div>
                <p className="text-stone-500 text-sm leading-relaxed line-clamp-2">
                  {getSutraDesc(sutra)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="pb-20">
            <HistoryViewer lang={lang} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SutraLibrary;