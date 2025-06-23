import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ButtonComponent, ButtonTypeEnum, ThemeEnum } from '@mwc/ui';
import { CurrencyPipe, TranslatePipe, TranslateService } from '@mwc/util';
import { PeriodService } from '../_services/period.service';
import { PriceService } from '../_services/price.service';
import { AbonnementOptions } from '../_types/AbonnementOptionsEnum';
import { TripOptions, TripOptionsEnum } from '../_types/TripOptionsEnum';

@Component({
  selector: 'mwc-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css'],
  standalone: true,
  imports: [
    CurrencyPipe,
    ButtonComponent,
    NgTemplateOutlet,
    CommonModule,
    TranslatePipe,
  ],
})
export class PriceComponent {
  private readonly _priceService = inject(PriceService);
  private readonly _periodService = inject(PeriodService);
  private readonly _translateService = inject(TranslateService);

  totalPrice = this._priceService.totalPrice;
  basePrice = this._priceService.basePrice;
  hourPrice = this._priceService.hourPrice;
  kilometerPrice = this._priceService.kilometerPrice;
  kilometers = this._priceService.kilometers;

  extraCosts = this._priceService.extraCosts;
  abonnement = this._priceService.abonnement;

  abonnementOptions = AbonnementOptions;
  buttonTypeEnum = ButtonTypeEnum;
  themeEnum = ThemeEnum;

  showPriceDetails = signal(false);

  priceDetails = computed(() => {
    const totalDepositDays = this._priceService.totalDepositDays();

    return [
      {
        label: `${this._translateService.translate(
          'calculator.price.details.discount'
        )} (${this.abonnementOptions[this.abonnement()].discount}%)`,
        totalCost: this.totalPrice() - this.basePrice(),
        hide: this.abonnementOptions[this.abonnement()].discount === 0,
      },
      {
        label: 'calculator.price.details.base_price',
        totalCost: this.basePrice(),
        children: [
          {
            label: `${this._translateService.translate(
              'calculator.price.details.rental_period'
            )} (${this._periodService.totalPeriodTimeString()})`,
            totalCost: this.hourPrice(),
          },
          {
            label: 'calculator.price.details.kilometer_price',
            totalCost: this.kilometerPrice(),
            children: [
              {
                label: 'calculator.price.details.total_kilometers',
                value: `${this.kilometers()} km`,
              },
              {
                label: `${this._translateService.translate(
                  'calculator.price.details.trip_price'
                )} (${TripOptions[this._priceService.trip()].title})`,
                totalCost: TripOptions[this._priceService.trip()].price,
                hide: this._priceService.trip() === TripOptionsEnum.None,
              },
              {
                label: `${this._translateService.translate(
                  'calculator.price.details.extra_km'
                )}`,
                value: `${this._priceService.extraKm()} km`,
                hide: this._priceService.extraKm() === 0,
              },
            ],
          },
          {
            label: 'calculator.price.details.extra_costs',
            totalCost: this.extraCosts(),
            children: [
              {
                label: 'calculator.price.details.start_price',
                totalCost: PriceService.startPrice,
                hide: !this._priceService.hasStartPrice(),
              },
              {
                label: `${this._translateService.translate(
                  'calculator.price.details.deposit'
                )} (${this._priceService.totalDepositDays()} ${
                  totalDepositDays === 1
                    ? this._translateService.translate('common.day')
                    : this._translateService.translate('common.days')
                })`,
                totalCost: this._priceService.depositPrice(),
                hide: this._priceService.hasDepositPaid(),
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
