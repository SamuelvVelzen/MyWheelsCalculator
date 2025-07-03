import { computed, inject, Injectable } from '@angular/core';
import {
  AbonnementOptionsEnum,
  AutoOptionsEnum,
  TripOptionsEnum,
} from '@mwc/calculator';
import { IRoute } from '../_types/routes.interface';
import { RouteQueryParamsService } from './route-query-params.service';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  static MAX_ROUTES = 30;

  showAddButton = computed(
    () => this.routes().length < RouteService.MAX_ROUTES
  );

  private readonly _routeQueryParamsService = inject(RouteQueryParamsService);

  routes = this._routeQueryParamsService.routes;

  constructor() {
    this._routeQueryParamsService.init();
  }

  addNewRoute() {
    if (this.routes().length >= RouteService.MAX_ROUTES) {
      return;
    }

    const newRoute: IRoute = {
      car: AutoOptionsEnum.Compact,
      abonnement: AbonnementOptionsEnum.Start,
      trip: TripOptionsEnum.None,
      kilometers: 0,
      hasDepositPaid: false,
      startDate: new Date(),
      endDate: new Date(),
    };

    this.routes.set([...this.routes(), newRoute]);
  }

  updateRoute(route: IRoute, index: number) {
    this.routes.update((routes) => {
      const newRoutes = [...routes];
      newRoutes[index] = route;
      return newRoutes;
    });
  }

  removeRoute(index: number) {
    this.routes.update((routes) => {
      const newRoutes = [...routes];
      newRoutes.splice(index, 1);
      return newRoutes;
    });
  }
}
