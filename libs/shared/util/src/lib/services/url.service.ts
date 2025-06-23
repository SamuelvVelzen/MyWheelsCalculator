import { computed, inject, Injectable } from '@angular/core';
import { LanguageEnum } from '../types/language.enum';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  private readonly _languageService = inject(LanguageService);

  getUrlBasedOnLanguage = (urls: { [key in LanguageEnum]: string }) =>
    computed(() => {
      console.log(
        this._languageService.currentLanguage(),
        urls[this._languageService.currentLanguage()]
      );
      return urls[this._languageService.currentLanguage()];
    });
}
