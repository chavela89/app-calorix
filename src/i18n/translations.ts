
import { ruTranslations } from './ru';
import { Language } from './types';

// Define the structure for translations
interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// Create the translations object with only Russian
export const translations: Translations = {
  ru: ruTranslations
};

// Available languages array (only Russian)
export const availableLanguages = [
  { code: 'ru' as Language, label: 'Русский' }
];
