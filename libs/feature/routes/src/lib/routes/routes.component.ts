import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import {
  IPriceDetail,
  PriceService,
  PriceTotalComponent,
} from '@mwc/calculator';
import { ButtonComponent, DialogService } from '@mwc/ui';
import { TranslatePipe } from '@mwc/util';
import { RouteQueryParamsService } from '../_services/route-query-params.service';
import { RouteService } from '../_services/route.service';
import { IRoute } from '../_types/routes.interface';
import { RouteListComponent } from '../route-list/route-list.component';
import { RoutesPriceDetailsComponent } from '../routes-price-details/routes-price-details.component';

@Component({
  selector: 'mwc-routes',
  imports: [
    CommonModule,
    RouteListComponent,
    ButtonComponent,
    RoutesPriceDetailsComponent,
    PriceTotalComponent,
    TranslatePipe,
  ],
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.css',
})
export class RoutesComponent {
  private readonly _routeQueryParamsService = inject(RouteQueryParamsService);
  private readonly _routeService = inject(RouteService);
  private readonly _dialogService = inject(DialogService);
  private readonly _priceService = inject(PriceService);

  routes = this._routeQueryParamsService.routes;

  showAddButton = this._routeService.showAddButton;

  constructor() {
    this._routeQueryParamsService.init();
  }

  totalPrice = computed(() => {
    return this.priceDetail().reduce((acc, details) => {
      return acc + details.priceDetail.totalPrice;
    }, 0);
  });

  priceDetail = computed((): { route: IRoute; priceDetail: IPriceDetail }[] => {
    return this.routes().map((route) => {
      const priceDetail = this._priceService.calculatePrice({
        abonnement: route.abonnement,
        trip: route.trip,
        car: route.car,
        kilometers: route.kilometers,
        hasStartPrice: route.hasStartPrice,
        hasDepositPaid: route.hasDepositPaid,
        startDate: route.startDate,
        endDate: route.endDate,
      });

      return {
        route,
        priceDetail,
      };
    });
  });

  addNewRoute(): void {
    this._routeService.addNewRoute();
  }

  saveRoute(event: { route: IRoute; index: number }): void {
    const { route, index } = event;
    this._routeService.updateRoute(route, index);
  }

  async deleteRoute(index: number): Promise<void> {
    const dialogResult = await this._dialogService.open(
      'Are you sure you want to delete this route?'
    );

    if (dialogResult) {
      this._routeService.removeRoute(index);
    }
  }
}
