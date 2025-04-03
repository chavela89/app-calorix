
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, availableLanguages } from "../i18n/translations";
import { Language } from "../i18n/types";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string, params?: Record<string, string | number>) => string;
  availableLanguages: { code: Language; label: string }[];
}

const defaultLanguage: Language = 'ru';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('app_language') as Language;
    return savedLanguage || defaultLanguage;
  });

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('app_language', language);
  }, [language]);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

  const translate = (key: string, params?: Record<string, string | number>): string => {
    const translation = translations[language]?.[key];
    
    if (!translation) {
      console.warn(`Translation not found: ${key}`);
      return key;
    }
    
    if (!params) return translation;
    
    return Object.entries(params).reduce(
      (acc, [paramKey, paramValue]) => acc.replace(new RegExp(`\\{\\{${paramKey}\\}\\}`, 'g'), String(paramValue)),
      translation
    );
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// Enhanced hook for components that use many translations
export const useEnhancedLanguage = (keys: string[]): { [key: string]: string } => {
  const { translate } = useLanguage();
  
  return keys.reduce((acc, key) => {
    acc[key] = translate(key);
    return acc;
  }, {} as { [key: string]: string });
};
