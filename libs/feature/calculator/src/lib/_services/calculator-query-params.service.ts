import { DestroyRef, effect, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Params } from '@angular/router';
import { EnumHelpers, QueryParamsService } from '@mwc/util';
import { debounceTime, forkJoin, take } from 'rxjs';
import { AbonnementOptionsEnum } from '../_types/AbonnementOptionsEnum';
import { AutoOptionsEnum } from '../_types/AutoOptionsEnum';
import { TripOptions, TripOptionsEnum } from '../_types/TripOptionsEnum';
import { calculatorQueryParams } from '../calculator.query-params';
import { CalculatorService } from './calculator.service';
import { PeriodService } from './period.service';

@Injectable({
  providedIn: 'root',
})
export class CalculatorQueryParamsService {
  private readonly _calculatorService = inject(CalculatorService);
  private readonly _queryParamsService = inject(QueryParamsService);
  private readonly _periodService = inject(PeriodService);
  private readonly _destroyRef = inject(DestroyRef);

  init() {
    this._loadFromQueryParams();

    effect(() => {
      this._updateQueryParams();
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
      .getQueryParams$(calculatorQueryParams.startDate, { parseDate: true })
      .pipe(take(1));
    const endDateQueryParam$ = this._queryParamsService
      .getQueryParams$(calculatorQueryParams.endDate, { parseDate: true })
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
          const abonnementValue = EnumHelpers.parseEnumFromObject(
            abonnementQueryParam$[0],
            AbonnementOptionsEnum
          );

          if (abonnementValue) {
            this._calculatorService.abonnement.set(abonnementValue);
          }

          const carValue = EnumHelpers.parseEnumFromObject(
            carQueryParam$[0],
            AutoOptionsEnum
          );

          if (carValue) {
            this._calculatorService.car.set(carValue);
          }

          const tripValue = this._decodeQueryParamToTrip(tripQueryParam$[0]);

          if (tripValue) {
            this._calculatorService.trip.set(tripValue);
          }

          if (kilometersQueryParam$[0]) {
            const kilometers = Number(kilometersQueryParam$[0]);

            const kilometersValue = isNaN(kilometers) ? 0 : kilometers;

            this._calculatorService.kilometers.set(kilometersValue);
          }

          if (startDateQueryParam$[0]) {
            this._periodService.startDate.set(
              new Date(startDateQueryParam$[0])
            );
          }

          if (endDateQueryParam$[0]) {
            this._periodService.endDate.set(new Date(endDateQueryParam$[0]));
          }

          if (hasDepositPaidQueryParam$[0]) {
            this._calculatorService.hasDepositPaid.set(
              hasDepositPaidQueryParam$[0] === 'true'
            );
          }
        }
      );
  }

  private _updateQueryParams() {
    //TODO: only update the first value of the array
    const queryParams: Params = {
      [calculatorQueryParams.abonnement]: this._calculatorService.abonnement(),
      [calculatorQueryParams.car]: this._calculatorService.car(),
      [calculatorQueryParams.trip]: this._encodeTripForQueryParams(
        this._calculatorService.trip()
      ),
      [calculatorQueryParams.kilometers]: this._calculatorService.kilometers(),
      [calculatorQueryParams.startDate]: this._periodService.startDate(),
      [calculatorQueryParams.endDate]: this._periodService.endDate(),
      [calculatorQueryParams.hasDepositPaid]:
        this._calculatorService.hasDepositPaid(),
    };

    this._queryParamsService
      .updateQueryParams$(queryParams)
      .pipe(debounceTime(100), takeUntilDestroyed(this._destroyRef))
      .subscribe();
  }

  private _encodeTripForQueryParams(trip: TripOptionsEnum): string {
    return TripOptions[trip].queryParamIdentifier;
  }

  private _decodeQueryParamToTrip(queryParam?: string | null): TripOptionsEnum {
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
