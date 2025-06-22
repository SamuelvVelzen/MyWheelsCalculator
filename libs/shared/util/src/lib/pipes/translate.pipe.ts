import { Pipe, PipeTransform, computed, inject } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { TranslationKey } from '../translations';

@Pipe({
  name: 'translate',
  pure: false,
  standalone: true,
})
export class TranslatePipe implements PipeTransform {
  private languageService = inject(LanguageService);

  transform(
    key: TranslationKey | string,
    params?: Record<string, string>
  ): string {
    // This will automatically react to language changes
    const currentTranslations = computed(() =>
      this.languageService.getTranslationsForLanguage(
        this.languageService.currentLanguage()
      )
    );

    let translation = currentTranslations()[key] || key;

    // Simple parameter replacement
    if (params) {
      Object.keys(params).forEach((param) => {
        translation = translation.replace(`{{${param}}}`, params[param]);
      });
    }

    return translation;
  }
}
