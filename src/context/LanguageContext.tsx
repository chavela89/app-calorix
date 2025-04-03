
import React, { createContext, useContext, useState, useCallback, useMemo, useEffect, ReactNode } from 'react';
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

// Cache для переводов для улучшения производительности
const translationCache: Record<string, Record<string, string>> = {
  en: {},
  ru: {}
};

// Provider component
export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ru');
  const [loading, setLoading] = useState(true);
  
  // Загружаем языковые настройки из localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ru')) {
      setLanguageState(savedLanguage);
    }
    setLoading(false);
  }, []);
  
  // Сохраняем языковые настройки в localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);
  
  // Оптимизированная функция установки языка
  const setLanguage = useCallback((newLanguage: Language) => {
    if (newLanguage === language) return;
    setLanguageState(newLanguage);
    document.documentElement.lang = newLanguage;
  }, [language]);
  
  // Мемоизированная функция перевода с кэшированием
  const translate = useCallback((key: string): string => {
    if (!translations[language]) {
      return key;
    }
    
    // Проверяем кэш сначала
    if (translationCache[language][key]) {
      return translationCache[language][key];
    }
    
    // Если перевода нет в кэше, получаем его
    const translation = translations[language][key] || key;
    
    // Сохраняем в кэш
    translationCache[language][key] = translation;
    
    return translation;
  }, [language]);
  
  const value = useMemo(() => ({
    language,
    setLanguage,
    translate,
    loading,
    availableLanguages,
  }), [language, setLanguage, translate, loading]);
  
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Enhanced Language Provider с дополнительной функциональностью
export const EnhancedLanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const { language } = useContext(LanguageContext);
  
  const value = useMemo(() => ({
    isEnglish: language === 'en',
  }), [language]);
  
  return (
    <EnhancedLanguageContext.Provider value={value}>
      {children}
    </EnhancedLanguageContext.Provider>
  );
};

// Custom hooks для доступа к контексту
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
