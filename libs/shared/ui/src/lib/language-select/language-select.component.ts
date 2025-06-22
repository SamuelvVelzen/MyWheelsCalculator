import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LanguageEnum, LanguageService } from '@mwc/util';

@Component({
  selector: 'mwc-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class LanguageSelectComponent {
  private languageService = inject(LanguageService);

  availableLanguages = [LanguageEnum.EN, LanguageEnum.NL];

  // Get current language from the service
  currentLanguage = this.languageService.currentLanguage;

  setLanguage(language: LanguageEnum) {
    this.languageService.setLanguage(language);
  }
}
