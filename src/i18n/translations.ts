
import { ruTranslations } from './ru';
import { Language } from './types';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

export const translations: Translations = {
  ru: ruTranslations
};

export const availableLanguages = [
  { code: 'ru' as Language, label: 'Русский' }
];
