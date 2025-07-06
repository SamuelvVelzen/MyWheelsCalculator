import { CommonModule, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import {
  CurrencyPipe,
  ScrollService,
  TranslatePipe,
  TranslateService,
} from '@mwc/util';
import { CalculatorService } from '../_services/calculator.service';
import { PeriodService } from '../_services/period.service';
import { PriceService } from '../_services/price.service';
import { AbonnementOptions } from '../_types/AbonnementOptionsEnum';
import { TripOptions, TripOptionsEnum } from '../_types/TripOptionsEnum';

@Component({
  selector: 'mwc-price',
  templateUrl: './price-detail.component.html',
  styleUrls: ['./price-detail.component.css'],
  standalone: true,
  imports: [CurrencyPipe, NgTemplateOutlet, CommonModule, TranslatePipe],
})
export class PriceDetailComponent {
  private readonly _calculatorService = inject(CalculatorService);
  private readonly _periodService = inject(PeriodService);
  private readonly _translateService = inject(TranslateService);
  private readonly _scrollService = inject(ScrollService);

  priceDetailsSection = viewChild.required<ElementRef>('priceDetailsSection');

  priceDetail = input.required<{
    totalPrice: number;
    basePrice: number;
    extraCosts: number;
    kmPrice: number;
    extraKm: number;
    hourPrice: number;
    depositPrice: number;
  }>();

  abonnementOptions = AbonnementOptions;

  priceDetailList = computed((): IPriceDetailLabel[] => {
    const {
      totalPrice,
      basePrice,
      hourPrice,
      kmPrice,
      extraCosts,
      extraKm,
      depositPrice,
    } = this.priceDetail();

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

    const totalPeriodTime = this._periodService.getFormattedPeriodTime(
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

  scrollToDetails() {
    const element = this.priceDetailsSection();

    this._scrollService.scrollTo(element.nativeElement);
  }
}

type IPriceDetailLabel =
  | {
      label: string;
      hide?: boolean;
      children?: IPriceDetailLabel[];
    } & (
      | {
          totalCost?: never;
          value: string;
        }
      | {
          totalCost: number;
          value?: never;
        }
    );
