
import React, { createContext, useContext, useState, useCallback, useMemo, useEffect, ReactNode } from 'react';
import { Language } from '../i18n/types';
import { translations } from '../i18n/translations';

const LanguageContext = createContext<{
  language: Language;
  translate: (key: string) => string;
  loading: boolean;
  availableLanguages: { code: Language; label: string; }[];
}>({
  language: 'ru',
  translate: (key: string) => key,
  loading: true,
  availableLanguages: [{ code: 'ru', label: 'Русский' }],
});

const translationCache: Record<string, string> = {};

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    document.documentElement.lang = 'ru';
    setLoading(false);
  }, []);
  
  const translate = useCallback((key: string): string => {
    if (translationCache[key]) {
      return translationCache[key];
    }
    
    const translation = translations['ru'][key] || key;
    translationCache[key] = translation;
    
    return translation;
  }, []);
  
  const value = useMemo(() => ({
    language: 'ru' as Language,
    translate,
    loading,
    availableLanguages: [{ code: 'ru', label: 'Русский' }],
  }), [translate, loading]);
  
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const EnhancedLanguageProvider = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export const useEnhancedLanguage = () => {
  return { isEnglish: false };
};
