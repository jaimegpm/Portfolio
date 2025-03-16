import { createContext, useState, useContext, useEffect } from 'react';
import translations from '../translations';

/**
 * Language Context
 * Provides language state and translation functions to the entire application
 */

// Create the context
const LanguageContext = createContext();

/**
 * LanguageProvider Component
 * Wraps the application and provides language state and translation functions
 */
export const LanguageProvider = ({ children }) => {
  // Default language is English, but check localStorage and browser preferences
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang && ['en', 'es'].includes(savedLang)) {
      return savedLang;
    }
    
    // If no saved preference, check browser language
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'es' ? 'es' : 'en';
  });

  // Update document language attribute and save preference when language changes
  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('language', language);
  }, [language]);

  /**
   * Get translation for a key
   * Supports nested keys like "section.subsection.key"
   * @param {string} key - The translation key
   * @returns {string} - The translated text
   */
  const t = (key) => {
    if (!key) return '';
    
    // Handle nested keys (e.g., "nav.home")
    const keys = key.split('.');
    let value = translations[language];
    
    // Navigate through the nested objects
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return key; // Return the key if translation not found
    }
    
    return value;
  };

  // Change the current language
  const changeLanguage = (lang) => {
    if (['en', 'es'].includes(lang)) {
      setLanguage(lang);
    }
  };

  // The context value that will be provided
  const contextValue = {
    language,
    t,
    changeLanguage,
    availableLanguages: ['en', 'es']
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Custom hook to use the language context
 * @returns {Object} - The language context value
 */
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext; 