
// Define the available languages
export type Language = 'en' | 'ru';

// Language details type
export interface LanguageOption {
  code: Language;
  label: string;
}

// Define the context properties
export interface LanguageContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string) => string;
  loading: boolean;
  availableLanguages: LanguageOption[];
}

// Enhanced language context with additional functions
export interface EnhancedLanguageContextProps {
  isEnglish: boolean;
}
