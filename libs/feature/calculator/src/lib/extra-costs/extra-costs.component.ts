import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FieldsetComponent, ToggleButtonComponent } from '@mwc/ui';
import {
  CurrencyPipe,
  LanguageEnum,
  TranslatePipe,
  UrlService,
} from '@mwc/util';
import { PriceService } from '../_services/price.service';

@Component({
  selector: 'mwc-extra-costs',
  templateUrl: './extra-costs.component.html',
  styleUrls: ['./extra-costs.component.css'],
  imports: [
    FieldsetComponent,
    ToggleButtonComponent,
    FormsModule,
    TranslatePipe,
    CurrencyPipe,
  ],
})
export class ExtraCostsComponent {
  private readonly _urlService = inject(UrlService);

  hasDepositPaid = model<boolean>(false);
  hasStartPrice = model<boolean>(false);

  startPrice = PriceService.startPrice;
  depositPrice = PriceService.depositPrice;

  depositPriceUrl = this._urlService.getUrlBasedOnLanguage({
    [LanguageEnum.EN]:
      'https://help.mywheels.nl/hc/en-nl/articles/5464626156828-Can-I-reduce-my-deductible',
    [LanguageEnum.NL]:
      'https://help.mywheels.nl/hc/nl/articles/5464626156828-Kan-ik-het-eigen-risico-verlagen',
  });

  startPriceUrl = this._urlService.getUrlBasedOnLanguage({
    [LanguageEnum.EN]: 'https://mywheels.nl/en/tarieven/abonnementen',
    [LanguageEnum.NL]: 'https://mywheels.nl/tarieven/abonnementen',
  });
}
