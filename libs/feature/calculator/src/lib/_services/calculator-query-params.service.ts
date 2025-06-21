import { effect, inject, Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { QueryParamsService } from '@mwc/util';
import { forkJoin, take } from 'rxjs';
import { calculatorQueryParams } from '../../calculator.query-params';
import { AbonnementOptionsEnum } from '../_types/AbonnementOptionsEnum';
import { AutoOptionsEnum } from '../_types/AutoOptionsEnum';
import { TripOptionsEnum } from '../_types/TripOptionsEnum';
import { PeriodService } from './period.service';
import { PriceService } from './price.service';

@Injectable({
  providedIn: 'root',
})
export class CalculatorQueryParamsService {
  private readonly _queryParamsService = inject(QueryParamsService);
  private readonly _priceService = inject(PriceService);
  private readonly _periodService = inject(PeriodService);

  init() {
    this.loadFromQueryParams();

    effect(() => {
      void this._priceService.abonnement();
      void this._priceService.car();
      void this._priceService.trip();
      void this._priceService.kilometers();
      void this._periodService.startDate();
      void this._periodService.endDate();
      void this._priceService.hasDepositPaid();

      this._updateQueryParams();
    });
  }

  private loadFromQueryParams() {
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
      .getQueryParams$(calculatorQueryParams.startDate)
      .pipe(take(1));
    const endDateQueryParam$ = this._queryParamsService
      .getQueryParams$(calculatorQueryParams.endDate)
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
    }).subscribe(
      ({
        abonnementQueryParam$,
        carQueryParam$,
        tripQueryParam$,
        kilometersQueryParam$,
        startDateQueryParam$,
        endDateQueryParam$,
        hasDepositPaidQueryParam$,
      }) => {
        const abonnementValue = this._parseEnum(
          abonnementQueryParam$,
          Object.values(AbonnementOptionsEnum)
        );

        if (abonnementValue) {
          this._priceService.abonnement.set(abonnementValue);
        }

        const carValue = this._parseEnum(
          carQueryParam$,
          Object.values(AutoOptionsEnum)
        );

        if (carValue) {
          this._priceService.car.set(carValue);
        }

        const tripValue = this._parseEnum(
          tripQueryParam$,
          Object.values(TripOptionsEnum)
        );

        if (tripValue) {
          this._priceService.trip.set(tripValue);
        }

        if (kilometersQueryParam$) {
          this._priceService.kilometers.set(Number(kilometersQueryParam$));
        }
        if (startDateQueryParam$) {
          this._periodService.startDate.set(new Date(startDateQueryParam$));
        }
        if (endDateQueryParam$) {
          this._periodService.endDate.set(new Date(endDateQueryParam$));
        }

        if (hasDepositPaidQueryParam$) {
          this._priceService.hasDepositPaid.set(
            hasDepositPaidQueryParam$ === 'true'
          );
        }
      }
    );
  }

  private _parseEnum<T>(value: string | null, enumValues: T[]): T | null {
    if (!value) {
      return null;
    }

    return enumValues.includes(value as T) ? (value as T) : null;
  }

  private _updateQueryParams() {
    const queryParams: Params = {
      [calculatorQueryParams.abonnement]: this._priceService.abonnement(),
      [calculatorQueryParams.car]: this._priceService.car(),
      [calculatorQueryParams.trip]: this._priceService.trip(),
      [calculatorQueryParams.kilometers]: this._priceService.kilometers(),
      [calculatorQueryParams.startDate]: this._periodService
        .startDate()
        .toISOString(),
      [calculatorQueryParams.endDate]: this._periodService
        .endDate()
        .toISOString(),
      [calculatorQueryParams.hasDepositPaid]:
        this._priceService.hasDepositPaid(),
    };

    this._queryParamsService.updateQueryParams$(queryParams).subscribe();
  }
}
