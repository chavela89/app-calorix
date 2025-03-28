
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { LanguageProvider as OriginalLanguageProvider, useLanguage } from "@/context/LanguageContext";

// Create a wrapper context to handle language-specific functionality
interface EnhancedLanguageContextProps {
  isEnglish: boolean;
  currentLanguage: string;
  translateMacro: (key: string) => string;
  translateCost: (amount: number) => string;
  translateUnit: (unit: string) => string;
}

const EnhancedLanguageContext = createContext<EnhancedLanguageContextProps>({
  isEnglish: false,
  currentLanguage: "ru",
  translateMacro: (key) => key,
  translateCost: (amount) => `${amount} ₽`,
  translateUnit: (unit) => unit
});

// Create helper for additional translations
export const useEnhancedLanguage = () => useContext(EnhancedLanguageContext);

// This component wraps the original LanguageProvider and adds additional functionality
export function LanguageProvider({ children }: { children: ReactNode }) {
  return (
    <OriginalLanguageProvider>
      <EnhancedLanguageWrapper>{children}</EnhancedLanguageWrapper>
    </OriginalLanguageProvider>
  );
}

// Enhanced wrapper with additional translations
function EnhancedLanguageWrapper({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  
  // Translations for macronutrients that aren't properly handled
  const macroTranslations: Record<string, Record<string, string>> = {
    en: {
      "Белки": "Proteins",
      "Жиры": "Fats",
      "Углеводы": "Carbs",
      "Макронутриенты": "Macronutrients",
      "Водный баланс": "Water balance",
      "Анализ питания": "Nutrition Analysis",
      "Пить 8 стаканов воды": "Drink 8 glasses of water",
      "Есть овощи с каждым приемом пищи": "Eat vegetables with every meal",
      "Белок в каждый прием пищи": "Protein in every meal",
      "Не есть после 19:00": "Don't eat after 7:00 PM",
      "Готовить дома": "Cook at home",
      "Рис бурый": "Brown rice",
      "г": "g",
      "мл": "ml",
      "шт": "pcs",
      "стл": "tbsp",
      "ч.л": "tsp",
      "ккал": "kcal",
      "Цель": "Goal"
    },
    ru: {
      "Proteins": "Белки",
      "Fats": "Жиры",
      "Carbs": "Углеводы",
      "Macronutrients": "Макронутриенты",
      "Water balance": "Водный баланс",
      "Nutrition Analysis": "Анализ питания",
      "Drink 8 glasses of water": "Пить 8 стаканов воды",
      "Eat vegetables with every meal": "Есть овощи с каждым приемом пищи",
      "Protein in every meal": "Белок в каждый прием пищи",
      "Don't eat after 7:00 PM": "Не есть после 19:00",
      "Cook at home": "Готовить дома",
      "Brown rice": "Рис бурый",
      "g": "г", 
      "ml": "мл",
      "pcs": "шт",
      "tbsp": "стл",
      "tsp": "ч.л",
      "kcal": "ккал",
      "Goal": "Цель"
    }
  };
  
  // Function to translate macronutrients
  const translateMacro = (key: string): string => {
    if (isEnglish && macroTranslations.en[key]) {
      return macroTranslations.en[key];
    }
    if (!isEnglish && macroTranslations.ru[key]) {
      return macroTranslations.ru[key];
    }
    return key;
  };
  
  // Function to format costs with proper currency symbol
  const translateCost = (amount: number): string => {
    if (isEnglish) {
      return `$${amount.toFixed(1)}`;
    }
    return `${amount.toFixed(1)} ₽`;
  };
  
  // Function to translate measurement units
  const translateUnit = (unit: string): string => {
    return translateMacro(unit);
  };
  
  return (
    <EnhancedLanguageContext.Provider 
      value={{ 
        isEnglish, 
        currentLanguage: language, 
        translateMacro, 
        translateCost,
        translateUnit
      }}
    >
      {children}
    </EnhancedLanguageContext.Provider>
  );
}
