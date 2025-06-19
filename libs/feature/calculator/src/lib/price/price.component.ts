import { Component, inject, signal } from '@angular/core';
import { ButtonComponent, ButtonTypeEnum, ThemeEnum } from '@mwc/ui';
import { CurrencyPipe } from '@mwc/util';
import { PriceService } from '../_services/price.service';
import { AbonnementOptions } from '../_types/AbonnementOptionsEnum';

@Component({
  selector: 'mwc-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css'],
  standalone: true,
  imports: [CurrencyPipe, ButtonComponent],
})
export class PriceComponent {
  priceService = inject(PriceService);

  totalPrice = this.priceService.totalPrice;
  basePrice = this.priceService.basePrice;
  hourPrice = this.priceService.hourPrice;
  kilometerPrice = this.priceService.kilometerPrice;
  extraCosts = this.priceService.extraCosts;
  abonnement = this.priceService.abonnement;

  abonnementOptions = AbonnementOptions;
  buttonTypeEnum = ButtonTypeEnum;
  themeEnum = ThemeEnum;

  showPriceDetails = signal(false);
}
