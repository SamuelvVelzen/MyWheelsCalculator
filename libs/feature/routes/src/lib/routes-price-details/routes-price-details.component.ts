import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { IPriceDetail, PeriodService } from '@mwc/calculator';
import { IconButtonComponent } from '@mwc/ui';
import {
  CurrencyPipe,
  ScrollService,
  TranslatePipe,
  TranslateService,
} from '@mwc/util';
import { tablerArrowRight } from '@ng-icons/tabler-icons';
import { IRoute } from './../_types/routes.interface';

@Component({
  selector: 'mwc-routes-price-details',
  templateUrl: './routes-price-details.component.html',
  styleUrls: ['./routes-price-details.component.css'],
  imports: [
    TranslatePipe,
    CurrencyPipe,
    NgTemplateOutlet,
    NgStyle,
    IconButtonComponent,
    NgClass,
  ],
})
export class RoutesPriceDetailsComponent {
  priceDetailsSection = viewChild.required<ElementRef>('priceDetailsSection');

  private readonly _periodService = inject(PeriodService);
  private readonly _translateService = inject(TranslateService);
  private readonly _scrollService = inject(ScrollService);

  tablerPencil = tablerArrowRight;

  priceDetail = input.required<
    {
      route: IRoute;
      priceDetail: IPriceDetail;
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
        expanded: false,
        details: [
          {
            label: `${this._translateService.translate(
              'calculator.price.details.rental_period'
            )} (${totalPeriodTime})`,
            totalCost: detail.hourPrice,
          },
          {
            label: 'calculator.price.details.kilometer_price',
            totalCost: detail.kmTotalCost,
          },
        ],
      };
    });
  });

  scrollToDetails() {
    const element = this.priceDetailsSection();

    this._scrollService.scrollTo(element.nativeElement);
  }

  onKeyDown(event: KeyboardEvent, detail: { expanded: boolean }) {
    if (event.key === 'Enter') {
      this.toggleRouteDetail(event, detail);
    }
  }

  toggleRouteDetail(event: Event, detail: { expanded: boolean }) {
    console.log(event, detail);
    event.stopPropagation();

    detail.expanded = !detail.expanded;

    if (detail.expanded) {
      const target = event.target as HTMLElement;
      const parentDiv = target.closest('.route-price-detail')?.parentElement;
      const expandedDetailDiv = parentDiv?.querySelector(
        '.expanded-detail'
      ) as HTMLElement;

      if (expandedDetailDiv) {
        this._scrollService.scrollTo(expandedDetailDiv);
      }
    }
  }
}
