
// This file is a compatibility layer to avoid breaking existing imports.
// It re-exports everything from the new LanguageContext module.

import { 
  LanguageProvider, 
  EnhancedLanguageProvider, 
  useLanguage, 
  useEnhancedLanguage 
} from './LanguageContext';

export { 
  LanguageProvider, 
  EnhancedLanguageProvider, 
  useLanguage, 
  useEnhancedLanguage 
};
