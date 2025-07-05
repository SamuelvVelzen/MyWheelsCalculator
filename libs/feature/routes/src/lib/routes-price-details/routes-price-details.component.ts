import { NgStyle, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { PeriodService } from '@mwc/calculator';
import { CurrencyPipe, TranslatePipe, TranslateService } from '@mwc/util';
import { IRoute } from './../_types/routes.interface';

@Component({
  selector: 'mwc-routes-price-details',
  templateUrl: './routes-price-details.component.html',
  styleUrls: ['./routes-price-details.component.css'],
  imports: [TranslatePipe, CurrencyPipe, NgTemplateOutlet, NgStyle],
})
export class RoutesPriceDetailsComponent {
  priceDetailsSection = viewChild.required<ElementRef>('priceDetailsSection');

  private readonly _periodService = inject(PeriodService);
  private readonly _translateService = inject(TranslateService);

  priceDetail = input.required<
    {
      route: IRoute;
      priceDetail: {
        totalPrice: number;
        basePrice: number;
        extraCosts: number;
        kmPrice: number;
        extraKm: number;
        hourPrice: number;
        depositPrice: number;
      };
    }[]
  >();

  mappedPriceDetail = computed(() => {
    const priceDetail = this.priceDetail();

    return priceDetail.map((details, index) => {
      const { route, priceDetail: detail } = details;

      const totalPeriodTime = this._periodService.getFormattedPeriodTime(
        route.startDate,
        route.endDate
      );

      return {
        label: `Route #${index + 1}`,
        totalCost: detail.totalPrice,
        children: [
          {
            label: `${this._translateService.translate(
              'calculator.price.details.rental_period'
            )} (${totalPeriodTime})`,
            totalCost: detail.hourPrice,
          },
          {
            label: 'calculator.price.details.kilometer_price',
            totalCost: detail.kmPrice,
          },
        ],
      };
    });
  });

  scrollToDetails() {
    const element = this.priceDetailsSection();

    element.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }
}
