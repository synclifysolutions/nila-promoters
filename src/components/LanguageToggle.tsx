import { useLanguage } from '../context/LanguageContext';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
      aria-label="Toggle Language"
    >
      <span className={language === 'ta' ? 'text-primary font-bold' : 'text-gray-500'}>
        தமிழ்
      </span>
      <span className="text-gray-300">|</span>
      <span className={language === 'en' ? 'text-primary font-bold' : 'text-gray-500'}>
        EN
      </span>
    </button>
  );
}