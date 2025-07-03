import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ButtonComponent } from '@mwc/ui';
import { CurrencyPipe, TranslatePipe, TranslateService } from '@mwc/util';
import { CalculatorService } from '../_services/calculator.service';
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
  private readonly _calculatorService = inject(CalculatorService);
  private readonly _priceService = inject(PriceService);
  private readonly _periodService = inject(PeriodService);
  private readonly _translateService = inject(TranslateService);

  priceDetails = computed(() =>
    this._priceService.calculatePrice({
      abonnement: this._calculatorService.abonnement(),
      trip: this._calculatorService.trip(),
      car: this._calculatorService.car(),
      kilometers: this._calculatorService.kilometers(),
      hasStartPrice: this._calculatorService.hasStartPrice(),
      hasDepositPaid: this._calculatorService.hasDepositPaid(),
    })
  );

  totalPrice = this.priceDetails().totalPrice;
  basePrice = this.priceDetails().basePrice;
  hourPrice = this.priceDetails().hourPrice;
  kilometerPrice = this.priceDetails().kmPrice;
  kilometers = this._calculatorService.kilometers;

  extraCosts = this.priceDetails().extraCosts;
  abonnement = this._calculatorService.abonnement;

  abonnementOptions = AbonnementOptions;

  showPriceDetails = signal(false);

  priceDetailList = computed(() => {
    const {
      totalPrice,
      basePrice,
      hourPrice,
      kmPrice,
      extraCosts,
      extraKm,
      depositPrice,
    } = this.priceDetails();

    return [
      {
        label: `${this._translateService.translate(
          'calculator.price.details.discount'
        )} (${this.abonnementOptions[this.abonnement()].discount}%)`,
        totalCost: totalPrice - basePrice,
        hide: this.abonnementOptions[this.abonnement()].discount === 0,
      },
      {
        label: 'calculator.price.details.base_price',
        totalCost: basePrice,
        children: [
          {
            label: `${this._translateService.translate(
              'calculator.price.details.rental_period'
            )} (${this._periodService.totalPeriodTimeString()})`,
            totalCost: hourPrice,
          },
          {
            label: 'calculator.price.details.kilometer_price',
            totalCost: kmPrice,
            children: [
              {
                label: 'calculator.price.details.total_kilometers',
                value: `${this.kilometers()} km`,
              },
              {
                label: `${this._translateService.translate(
                  'calculator.price.details.trip_price'
                )} (${TripOptions[this._calculatorService.trip()].title})`,
                totalCost: TripOptions[this._calculatorService.trip()].price,
                hide: this._calculatorService.trip() === TripOptionsEnum.None,
              },
              {
                label: `${this._translateService.translate(
                  'calculator.price.details.extra_km'
                )}`,
                value: `${extraKm} km`,
                hide: extraKm === 0,
              },
            ],
          },
          {
            label: 'calculator.price.details.extra_costs',
            totalCost: extraCosts,
            children: [
              {
                label: 'calculator.price.details.start_price',
                totalCost: PriceService.startPrice,
                hide: !this._calculatorService.hasStartPrice(),
              },
              {
                label: `${this._translateService.translate(
                  'calculator.price.details.deposit'
                )} (${this._periodService.totalDepositDays()} ${
                  this._periodService.totalDepositDays() === 1
                    ? this._translateService.translate('common.day')
                    : this._translateService.translate('common.days')
                })`,
                totalCost: depositPrice,
                hide: this._calculatorService.hasDepositPaid(),
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
