import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
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
      startDate: this._calculatorService.startDate(),
      endDate: this._calculatorService.endDate(),
    })
  );

  abonnementOptions = AbonnementOptions;

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

    const {
      trip,
      kilometers,
      abonnement,
      hasStartPrice,
      hasDepositPaid,
      startDate,
      endDate,
    } = this._calculatorService;

    const totalDepositDays = this._periodService.getTotalDepositDays(
      startDate(),
      endDate()
    );

    const totalPeriodTime = this._periodService.getTotalPeriodTime(
      startDate(),
      endDate()
    );

    return [
      {
        label: `${this._translateService.translate(
          'calculator.price.details.discount'
        )} (${this.abonnementOptions[abonnement()].discount}%)`,
        totalCost: totalPrice - basePrice,
        hide: this.abonnementOptions[abonnement()].discount === 0,
      },
      {
        label: 'calculator.price.details.base_price',
        totalCost: basePrice,
        children: [
          {
            label: `${this._translateService.translate(
              'calculator.price.details.rental_period'
            )} (${totalPeriodTime})`,
            totalCost: hourPrice,
          },
          {
            label: 'calculator.price.details.kilometer_price',
            totalCost: kmPrice,
            children: [
              {
                label: 'calculator.price.details.total_kilometers',
                value: `${kilometers()} km`,
              },
              {
                label: `${this._translateService.translate(
                  'calculator.price.details.trip_price'
                )} (${TripOptions[trip()].title})`,
                totalCost: TripOptions[trip()].price,
                hide: trip() === TripOptionsEnum.None,
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
                hide: !hasStartPrice(),
              },
              {
                label: `${this._translateService.translate(
                  'calculator.price.details.deposit'
                )} (${totalDepositDays} ${
                  totalDepositDays === 1
                    ? this._translateService.translate('common.day')
                    : this._translateService.translate('common.days')
                })`,
                totalCost: depositPrice,
                hide: hasDepositPaid(),
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
