import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ButtonComponent, ButtonTypeEnum, ThemeEnum } from '@mwc/ui';
import { CurrencyPipe } from '@mwc/util';
import { PriceService } from '../_services/price.service';
import { AbonnementOptions } from '../_types/AbonnementOptionsEnum';
import { TripOptions, TripOptionsEnum } from '../_types/TripOptionsEnum';

@Component({
  selector: 'mwc-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css'],
  standalone: true,
  imports: [CurrencyPipe, ButtonComponent, NgTemplateOutlet, CommonModule],
})
export class PriceComponent {
  priceService = inject(PriceService);

  totalPrice = this.priceService.totalPrice;
  basePrice = this.priceService.basePrice;
  hourPrice = this.priceService.hourPrice;
  kilometerPrice = this.priceService.kilometerPrice;
  kilometers = this.priceService.kilometers;
  extraCosts = this.priceService.extraCosts;
  abonnement = this.priceService.abonnement;

  abonnementOptions = AbonnementOptions;
  buttonTypeEnum = ButtonTypeEnum;
  themeEnum = ThemeEnum;

  showPriceDetails = signal(false);

  priceDetails = computed(() => {
    return [
      {
        label: `Discount (${
          this.abonnementOptions[this.abonnement()].discount
        }%)`,
        totalCost: this.totalPrice() - this.basePrice(),
        hide: this.abonnementOptions[this.abonnement()].discount === 0,
      },
      {
        label: 'Base price',
        totalCost: this.basePrice(),
        children: [
          {
            label: 'Hour price',
            totalCost: this.hourPrice(),
          },
          {
            label: 'Kilometer price',
            totalCost: this.kilometerPrice(),
            children: [
              {
                label: 'Total kilometers',
                value: this.kilometers(),
              },
              {
                label: `Trip price (${
                  TripOptions[this.priceService.trip()].title
                })`,
                totalCost: TripOptions[this.priceService.trip()].price,
                hide: this.priceService.trip() === TripOptionsEnum.None,
              },
              {
                label: 'Extra km',
                value: this.priceService.extraKm(),
                hide: this.priceService.extraKm() === 0,
              },
            ],
          },
          {
            label: 'Extra costs',
            totalCost: this.extraCosts(),
            children: [
              {
                label: 'Start price',
                totalCost: PriceService.startPrice,
                hide: !this.priceService.hasStartPrice(),
              },
              {
                label: 'Deposit',
                totalCost: PriceService.depositPrice,
                hide: this.priceService.hasDepositPaid(),
              },
            ],
          },
        ],
      },
    ];
  });
}

export type IPriceDetail =
  | {
      label: string;
      hide?: boolean;
      children?: IPriceDetail[];
    } & (
      | {
          totalCost?: never;
          value: number;
        }
      | {
          totalCost: number;
          value?: never;
        }
    );
