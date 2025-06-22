import { Component } from '@angular/core';
import { LanguageEnum } from '@mwc/util';

@Component({
  selector: 'mwc-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.css'],
})
export class LanguageSelectComponent {
  availableLanguages = [LanguageEnum.EN, LanguageEnum.NL];

  setLanguage(language: LanguageEnum) {
    console.log(language);
  }
}
