
import React, { createContext, useContext, useEffect, useState } from "react";

// Определение доступных языков
export const LANGUAGES = [
  { id: "ru", name: "Русский" },
  { id: "en", name: "English" },
  { id: "es", name: "Español" },
  { id: "fr", name: "Français" },
  { id: "de", name: "Deutsch" },
  { id: "pt", name: "Português" },
  { id: "zh", name: "中文" },
  { id: "ja", name: "日本語" },
  { id: "ko", name: "한국어" },
  { id: "tr", name: "Türkçe" },
  { id: "it", name: "Italiano" },
];

// Определение регионов СНГ
const CIS_REGIONS = ["RU", "BY", "KZ", "UA", "UZ", "TM", "TJ", "MD", "KG", "AM", "AZ"];

type LanguageContextType = {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  languages: typeof LANGUAGES;
  translate: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState("ru");
  const [translations, setTranslations] = useState<Record<string, Record<string, string>>>({});

  // Определение языка по региону
  useEffect(() => {
    const determineLanguage = () => {
      // Восстанавливаем язык из локального хранилища
      const savedLanguage = localStorage.getItem("app_language");
      if (savedLanguage && LANGUAGES.some((lang) => lang.id === savedLanguage)) {
        return savedLanguage;
      }

      // Определяем регион пользователя
      try {
        const userLocale = navigator.language;
        const regionCode = userLocale.split('-')[1]?.toUpperCase();
        
        // Если регион в СНГ, устанавливаем русский язык
        if (regionCode && CIS_REGIONS.includes(regionCode)) {
          return "ru";
        }
        
        // В противном случае проверяем, поддерживается ли язык пользователя
        const languageCode = userLocale.split('-')[0];
        if (LANGUAGES.some((lang) => lang.id === languageCode)) {
          return languageCode;
        }
      } catch (error) {
        console.error("Failed to determine language:", error);
      }

      // По умолчанию возвращаем английский
      return "en";
    };

    const language = determineLanguage();
    setCurrentLanguage(language);
    localStorage.setItem("app_language", language);
  }, []);

  // Загрузка переводов
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        // В реальном приложении здесь должен быть запрос к API или импорт файлов переводов
        // Для простоты прототипа используем строковые литералы
        
        const ruTranslations = {
          "app_name": "CaloriX",
          "dashboard": "Панель управления",
          "diary": "Дневник питания",
          "recipes": "Рецепты",
          "planner": "Планировщик",
          "progress": "Прогресс",
          "settings": "Настройки",
          "profile": "Профиль",
          // ...другие переводы
        };
        
        const enTranslations = {
          "app_name": "CaloriX",
          "dashboard": "Dashboard",
          "diary": "Food Diary",
          "recipes": "Recipes",
          "planner": "Meal Planner",
          "progress": "Progress",
          "settings": "Settings",
          "profile": "Profile",
          // ...другие переводы
        };
        
        setTranslations({
          ru: ruTranslations,
          en: enTranslations,
          // Остальные языки для прототипа будут использовать английские переводы
          es: enTranslations,
          fr: enTranslations,
          de: enTranslations,
          pt: enTranslations,
          zh: enTranslations,
          ja: enTranslations,
          ko: enTranslations,
          tr: enTranslations,
          it: enTranslations,
        });
      } catch (error) {
        console.error("Failed to load translations:", error);
      }
    };

    loadTranslations();
  }, []);

  const setLanguage = (language: string) => {
    if (LANGUAGES.some((lang) => lang.id === language)) {
      setCurrentLanguage(language);
      localStorage.setItem("app_language", language);
    }
  };

  const translate = (key: string): string => {
    return translations[currentLanguage]?.[key] || translations.en?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, languages: LANGUAGES, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
