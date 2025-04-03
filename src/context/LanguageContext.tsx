
import React, { createContext, useContext, useState, useCallback, useMemo, useEffect, ReactNode } from 'react';
import { Language, LanguageContextProps, EnhancedLanguageContextProps } from '../i18n/types';
import { translations } from '../i18n/translations';

// Create the context with default values
const LanguageContext = createContext<LanguageContextProps>({
  language: 'ru',
  setLanguage: () => {},
  translate: (key: string) => key,
  loading: true,
  availableLanguages: [{ code: 'ru' as Language, label: 'Русский' }],
});

const EnhancedLanguageContext = createContext<EnhancedLanguageContextProps>({
  isEnglish: false,
});

// Cache для переводов для улучшения производительности
const translationCache: Record<string, Record<string, string>> = {
  ru: {}
};

// Provider component
export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language] = useState<Language>('ru');
  const [loading, setLoading] = useState(true);
  
  // Устанавливаем русский язык по умолчанию
  useEffect(() => {
    document.documentElement.lang = language;
    setLoading(false);
  }, [language]);
  
  // Функция установки языка (всегда русский)
  const setLanguage = useCallback(() => {
    // В данной версии приложения используем только русский язык
    document.documentElement.lang = 'ru';
  }, []);
  
  // Мемоизированная функция перевода с кэшированием
  const translate = useCallback((key: string): string => {
    if (!translations['ru']) {
      return key;
    }
    
    // Проверяем кэш сначала
    if (translationCache['ru'][key]) {
      return translationCache['ru'][key];
    }
    
    // Если перевода нет в кэше, получаем его
    const translation = translations['ru'][key] || key;
    
    // Сохраняем в кэш
    translationCache['ru'][key] = translation;
    
    return translation;
  }, []);
  
  const value = useMemo(() => ({
    language,
    setLanguage,
    translate,
    loading,
    availableLanguages: [{ code: 'ru' as Language, label: 'Русский' }],
  }), [language, setLanguage, translate, loading]);
  
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Enhanced Language Provider с дополнительной функциональностью
export const EnhancedLanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const value = useMemo(() => ({
    isEnglish: false,
  }), []);
  
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
