import { computed, inject, Injectable } from '@angular/core';
import {
  AbonnementOptionsEnum,
  AutoOptionsEnum,
  CalculatorService,
  PeriodService,
  TripOptionsEnum,
} from '@mwc/calculator';
import { DateHelpers } from '@mwc/util';
import { addHours } from 'date-fns';
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
  private readonly _calculatorService = inject(CalculatorService);
  private readonly _periodService = inject(PeriodService);

  routes = this._routeQueryParamsService.routes;

  addNewRoute() {
    if (this.routes().length >= RouteService.MAX_ROUTES) {
      return;
    }

    const abonnement = AbonnementOptionsEnum.Start;
    const trip = TripOptionsEnum.None;

    const startDate = DateHelpers.getRoundedDate(
      new Date(),
      PeriodService.roundToNearestStep
    );

    const endDate = addHours(startDate, 4);

    const hasStartPrice = this._calculatorService.calculateHasStartPrice(
      abonnement,
      trip
    );

    const newRoute: IRoute = {
      car: AutoOptionsEnum.Compact,
      abonnement,
      trip,
      kilometers: 0,
      hasDepositPaid: false,
      startDate,
      endDate,
      hasStartPrice,
    };

    this.routes.update((routes) => [...routes, newRoute]);
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
