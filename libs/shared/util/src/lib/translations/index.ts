import { LanguageEnum } from '../types/language.enum';
import { enTranslations } from './en.translations';
import { nlTranslations } from './nl.translations';

// Export individual translation files
export { enTranslations } from './en.translations';
export { nlTranslations } from './nl.translations';

// Create translation key type from English translations
export type TranslationKey = keyof typeof enTranslations;

// Combined translations object
export const translations: Record<LanguageEnum, Record<string, string>> = {
  [LanguageEnum.EN]: enTranslations,
  [LanguageEnum.NL]: nlTranslations,
};
