
import { ruTranslations } from './ru';
import { enTranslations } from './en';
import { Language } from './types';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

export const translations: Translations = {
  ru: ruTranslations,
  en: enTranslations
};

export const availableLanguages = [
  { code: 'ru' as Language, label: 'Русский' },
  { code: 'en' as Language, label: 'English' }
];
