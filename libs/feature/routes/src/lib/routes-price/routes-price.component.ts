import { Component, computed, inject, input } from '@angular/core';
import { PriceService } from '@mwc/calculator';
import { IRoute } from '../_types/routes.interface';

@Component({
  selector: 'mwc-routes-price',
  templateUrl: './routes-price.component.html',
  styleUrls: ['./routes-price.component.css'],
})
export class RoutesPriceComponent {
  private readonly _priceService = inject(PriceService);

  routes = input.required<IRoute[]>();

  routePrices = computed(() => {
    this.routes().map((route) => {
      this._priceService.calculatePrice({
        abonnement: route.abonnement,
        trip: route.trip,
        car: route.car,
        kilometers: route.kilometers,
        hasStartPrice: route.hasStartPrice,
        hasDepositPaid: route.hasDepositPaid,
        startDate: route.startDate,
        endDate: route.endDate,
      });
    });
  });
}
