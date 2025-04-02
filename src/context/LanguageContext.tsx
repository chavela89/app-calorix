
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, LanguageContextProps, EnhancedLanguageContextProps, LanguageOption } from '../i18n/types';
import { translations, availableLanguages } from '../i18n/translations';

// Create the context with default values
const LanguageContext = createContext<LanguageContextProps>({
  language: 'en',
  setLanguage: () => {},
  translate: (key: string) => key,
  loading: true,
  availableLanguages: availableLanguages,
});

const EnhancedLanguageContext = createContext<EnhancedLanguageContextProps>({
  isEnglish: true,
});

// Provider component
export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');
  const [loading, setLoading] = useState(true);
  
  // Load language preference from local storage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ru')) {
      setLanguage(savedLanguage);
    }
    setLoading(false);
  }, []);
  
  // Save language preference to local storage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);
  
  // Translation function
  const translate = (key: string): string => {
    if (!translations[language]) {
      return key;
    }
    
    return translations[language][key] || key;
  };
  
  const value: LanguageContextProps = {
    language,
    setLanguage,
    translate,
    loading,
    availableLanguages,
  };
  
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Enhanced Language Provider with additional functionality
export const EnhancedLanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const { language } = useContext(LanguageContext);
  
  const value: EnhancedLanguageContextProps = {
    isEnglish: language === 'en',
  };
  
  return (
    <EnhancedLanguageContext.Provider value={value}>
      {children}
    </EnhancedLanguageContext.Provider>
  );
};

// Custom hooks for easy access to the context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const useEnhancedLanguage = () => {
  const context = useContext(EnhancedLanguageContext);
  if (context === undefined) {
    throw new Error('useEnhancedLanguage must be used within an EnhancedLanguageProvider');
  }
  return context;
};
