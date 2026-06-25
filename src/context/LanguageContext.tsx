import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ta';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 1. Define your dictionary structure
const translations: Record<Language, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.contact": "Contact",
    "nav.projects": "Projects",
    "hero.title": "Welcome to Nila Land Legacy",
    "hero.subtitle": "Premium Land Layouts & Real Estate Solutions",
    // Add more English keys here...
  },
  ta: {
    "nav.home": "முகப்பு",
    "nav.about": "எங்களைப் பற்றி",
    "nav.contact": "தொடர்பு",
    "nav.projects": "திட்டங்கள்",
    "hero.title": "நிலா லேண்ட் லெகசிக்கு உங்களை வரவேற்கிறோம்",
    "hero.subtitle": "பிரீமியம் நில அமைப்புகள் & ரியல் எஸ்டேட் தீர்வுகள்",
    // Add matching Tamil translations here...
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize from localStorage so it remembers user preference on refresh/navigation
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('site_lang');
    return (saved === 'en' || saved === 'ta') ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('site_lang', language);
    document.documentElement.lang = language; // Updates HTML attribute for accessibility
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'ta' : 'en'));
  };

  // Helper function to look up nested dot notation or fallback gracefully
  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};