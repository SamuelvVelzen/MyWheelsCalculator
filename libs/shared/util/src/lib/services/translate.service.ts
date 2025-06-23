import { inject, Injectable } from '@angular/core';
import { TranslationKey, translations } from '../translations';
import { LanguageEnum } from '../types/language.enum';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private readonly _languageService = inject(LanguageService);

  /**
   * Get translations for the current language
   */
  getTranslations(): Record<string, string> {
    return this.getTranslationsForLanguage(
      this._languageService.currentLanguage()
    );
  }

  /**
   * Get translations for a specific language
   */
  getTranslationsForLanguage(language: LanguageEnum): Record<string, string> {
    return translations[language] || translations[LanguageEnum.EN];
  }

  /**
   * Translate a key for the current language
   */
  translate(key: TranslationKey | string): string {
    const translations = this.getTranslations();
    return translations[key] || key;
  }
}
