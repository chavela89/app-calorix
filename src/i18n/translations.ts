
import { enTranslations } from './en';
import { ruTranslations } from './ru';
import { Language } from './types';

// Define the structure for translations
interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// Create the translations object
export const translations: Translations = {
  en: enTranslations,
  ru: ruTranslations
};

// Available languages array
export const availableLanguages = [
  { code: 'en' as Language, label: 'English' },
  { code: 'ru' as Language, label: 'Русский' }
];
