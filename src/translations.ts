
import { ruTranslations } from './i18n/modules/ru';
import { enTranslations } from './i18n/modules/en';
import { Language } from './i18n/types';

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
  { code: 'ru' as Language, label: 'Русский' }
];
