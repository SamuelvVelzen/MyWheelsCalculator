import { DestroyRef, effect, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Params } from '@angular/router';
import {
  AbonnementOptionsEnum,
  AutoOptionsEnum,
  CalculatorService,
  TripOptions,
  TripOptionsEnum,
} from '@mwc/calculator';
import { EnumHelpers, QueryParamsService } from '@mwc/util';
import { debounceTime, forkJoin, take } from 'rxjs';

import { calculatorQueryParams } from '@mwc/calculator';
import { IRoute } from '../_types/routes.interface';

@Injectable({
  providedIn: 'root',
})
export class RouteQueryParamsService {
  private readonly _queryParamsService = inject(QueryParamsService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _calculatorService = inject(CalculatorService);

  routes = signal<IRoute[]>([]);

  init() {
    this._loadFromQueryParams();

    effect(() => {
      this.updateQueryParams();
    });
  }

  private _loadFromQueryParams() {
    const abonnementQueryParam$ = this._queryParamsService
      .getQueryParams$(calculatorQueryParams.abonnement)
      .pipe(take(1));
    const carQueryParam$ = this._queryParamsService
      .getQueryParams$(calculatorQueryParams.car)
      .pipe(take(1));
    const tripQueryParam$ = this._queryParamsService
      .getQueryParams$(calculatorQueryParams.trip)
      .pipe(take(1));
    const kilometersQueryParam$ = this._queryParamsService
      .getQueryParams$(calculatorQueryParams.kilometers)
      .pipe(take(1));
    const startDateQueryParam$ = this._queryParamsService
      .getQueryParams$(calculatorQueryParams.startDate, {
        parseDate: true,
      })
      .pipe(take(1));
    const endDateQueryParam$ = this._queryParamsService
      .getQueryParams$(calculatorQueryParams.endDate, {
        parseDate: true,
      })
      .pipe(take(1));
    const hasDepositPaidQueryParam$ = this._queryParamsService
      .getQueryParams$(calculatorQueryParams.hasDepositPaid)
      .pipe(take(1));

    forkJoin({
      abonnementQueryParam$,
      carQueryParam$,
      tripQueryParam$,
      kilometersQueryParam$,
      startDateQueryParam$,
      endDateQueryParam$,
      hasDepositPaidQueryParam$,
    })
      .pipe(takeUntilDestroyed())
      .subscribe(
        ({
          abonnementQueryParam$,
          carQueryParam$,
          tripQueryParam$,
          kilometersQueryParam$,
          startDateQueryParam$,
          endDateQueryParam$,
          hasDepositPaidQueryParam$,
        }) => {
          // Find the maximum length across all arrays to handle missing data
          const maxLength = Math.max(
            abonnementQueryParam$.length,
            carQueryParam$.length,
            tripQueryParam$.length,
            kilometersQueryParam$.length,
            startDateQueryParam$.length,
            endDateQueryParam$.length,
            hasDepositPaidQueryParam$.length
          );

          // If no data exists, return early
          if (maxLength === 0) {
            this.routes.set([]);
            return;
          }

          const routes: IRoute[] = Array.from({ length: maxLength }, (_, i) => {
            const abonnement =
              EnumHelpers.parseEnumFromObject(
                abonnementQueryParam$[i],
                AbonnementOptionsEnum
              ) || AbonnementOptionsEnum.Start;

            const trip = this._decodeQueryParamToTrip(tripQueryParam$[i]);

            const hasStartPrice =
              this._calculatorService.calculateHasStartPrice(abonnement, trip);

            return {
              abonnement,
              car:
                EnumHelpers.parseEnumFromObject(
                  carQueryParam$[i],
                  AutoOptionsEnum
                ) || AutoOptionsEnum.Comfort,
              trip,
              kilometers: Number(kilometersQueryParam$[i]) || 0,
              hasDepositPaid: hasDepositPaidQueryParam$[i] === 'true',
              startDate: startDateQueryParam$[i] || null,
              endDate: endDateQueryParam$[i] || null,
              hasStartPrice,
            };
          });

          this.routes.set(routes);
        }
      );
  }

  updateQueryParams() {
    const routes = this.routes();

    if (routes.length === 0) {
      return;
    }

    const queryParams: Params = {
      [calculatorQueryParams.abonnement]: routes.map(
        (route) => route.abonnement
      ),
      [calculatorQueryParams.car]: routes.map((route) => route.car),
      [calculatorQueryParams.trip]: this._encodeTripForQueryParams(routes),
      [calculatorQueryParams.kilometers]: routes.map(
        (route) => route.kilometers
      ),
      [calculatorQueryParams.startDate]: routes.map((route) => route.startDate),
      [calculatorQueryParams.endDate]: routes.map((route) => route.endDate),
      [calculatorQueryParams.hasDepositPaid]: routes.map(
        (route) => route.hasDepositPaid
      ),
    };

    this._queryParamsService
      .updateQueryParams$(queryParams, { mode: 'multiple' })
      .pipe(debounceTime(100), takeUntilDestroyed(this._destroyRef))
      .subscribe();
  }

  private _encodeTripForQueryParams(routes: IRoute[]): string[] {
    return routes.map((route) => {
      const trip = route.trip;

      return TripOptions[trip].queryParamIdentifier;
    });
  }

  private _decodeQueryParamToTrip(
    queryParam: string | undefined
  ): TripOptionsEnum {
    if (!queryParam) {
      return TripOptionsEnum.None;
    }

    const tripString = Object.entries(TripOptions).find(
      ([_, tripOptions]) => tripOptions.queryParamIdentifier === queryParam
    )?.[0];

    if (!tripString) {
      return TripOptionsEnum.None;
    }

    return (
      EnumHelpers.parseEnumFromObject(tripString, TripOptionsEnum) ||
      TripOptionsEnum.None
    );
  }
}
