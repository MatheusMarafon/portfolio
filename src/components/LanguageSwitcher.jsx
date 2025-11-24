import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher = () => {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <button 
        onClick={toggleLanguage}
        className="fixed top-6 right-6 z-50 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-2 flex items-center gap-2 transition backdrop-blur-md"
    >
        <span className="text-lg">{lang === 'pt' ? '🇧🇷' : '🇺🇸'}</span>
        <span className="text-sm font-bold text-gray-300">{lang.toUpperCase()}</span>
    </button>
  );
};

export default LanguageSwitcher;