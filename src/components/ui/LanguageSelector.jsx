import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

/**
 * LanguageSelector Component
 * Allows users to switch between available languages
 */
const LanguageSelector = () => {
  const { language, changeLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle language change
  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="language-selector relative" ref={dropdownRef}>
      <button 
        className="language-selector__button flex items-center space-x-1 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Change language"
        onClick={toggleDropdown}
      >
        <span className="language-selector__current text-sm font-medium">
          {language.toUpperCase()}
        </span>
        <svg 
          className={`language-selector__icon w-4 h-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" 
          />
        </svg>
      </button>
      
      {isOpen && (
        <div className="language-selector__dropdown absolute right-0 mt-2 w-28 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-50 animate-fade-in">
          <div className="language-selector__options py-1">
            <button
              className={`language-selector__option w-full text-left px-4 py-2 text-sm ${
                language === 'en'
                  ? 'bg-gray-100 dark:bg-gray-700 text-primary dark:text-primary-light font-medium'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => handleLanguageChange('en')}
            >
              {t('language.en')}
            </button>
            <button
              className={`language-selector__option w-full text-left px-4 py-2 text-sm ${
                language === 'es'
                  ? 'bg-gray-100 dark:bg-gray-700 text-primary dark:text-primary-light font-medium'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => handleLanguageChange('es')}
            >
              {t('language.es')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector; 