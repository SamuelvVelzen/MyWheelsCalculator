import { isPlatformBrowser } from '@angular/common';
import { effect, Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { LanguageEnum } from '../types/language.enum';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly LANGUAGE_STORAGE_KEY = 'mwc-language';
  private isBrowser: boolean;

  // Signal for current language state
  private _currentLanguage = signal<LanguageEnum>(this.getInitialLanguage());

  // Public readonly signal
  readonly currentLanguage = this._currentLanguage.asReadonly();

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);

    // Effect to persist language changes to localStorage
    effect(() => {
      const language = this._currentLanguage();
      if (this.isBrowser) {
        localStorage.setItem(this.LANGUAGE_STORAGE_KEY, language);
        this.updateDocumentLanguage(language);
      }
    });
  }

  /**
   * Set the current language
   */
  setLanguage(language: LanguageEnum): void {
    this._currentLanguage.set(language);
  }

  /**
   * Get initial language from localStorage or default to English
   */
  private getInitialLanguage(): LanguageEnum {
    // Default to English during SSR
    if (!this.isBrowser) {
      return LanguageEnum.EN;
    }

    const stored = localStorage.getItem(this.LANGUAGE_STORAGE_KEY);
    if (
      stored &&
      Object.values(LanguageEnum).includes(stored as LanguageEnum)
    ) {
      return stored as LanguageEnum;
    }

    // Try to detect browser language
    const browserLanguage = navigator.language.toLowerCase();
    if (browserLanguage.startsWith('nl')) {
      return LanguageEnum.NL;
    }

    return LanguageEnum.EN;
  }

  /**
   * Update document language attribute
   */
  private updateDocumentLanguage(language: LanguageEnum): void {
    if (this.isBrowser && typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }
}
