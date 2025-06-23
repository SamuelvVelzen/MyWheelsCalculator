import { Component, inject } from '@angular/core';
import {
  CurrencyPipe,
  LanguageEnum,
  TranslatePipe,
  UrlService,
} from '@mwc/util';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'mwc-discount-button',
  templateUrl: './discount-button.component.html',
  styleUrls: ['./discount-button.component.css'],
  standalone: true,
  imports: [ButtonComponent, CurrencyPipe, TranslatePipe],
})
export class DiscountButtonComponent {
  private readonly _urlService = inject(UrlService);

  url = this._urlService.getUrlBasedOnLanguage({
    [LanguageEnum.EN]: 'https://mywheels.nl/en/uitnodigen/samuel9178',
    [LanguageEnum.NL]: 'https://mywheels.nl/uitnodigen/samuel9178',
  });
}
