import { effect, inject, Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { QueryParamsService } from '@mwc/util';
import { forkJoin } from 'rxjs';
import { calculatorQueryParams } from '../../calculator.query-params';
import { AbonnementOptionsEnum } from '../_types/AbonnementOptionsEnum';
import { AutoOptionsEnum } from '../_types/AutoOptionsEnum';
import { TripOptionsEnum } from '../_types/TripOptionsEnum';
import { PriceService } from './price.service';

@Injectable({
  providedIn: 'root',
})
export class CalculatorQueryParamsService {
  private readonly _queryParamsService = inject(QueryParamsService);
  private readonly _priceService = inject(PriceService);

  init() {
    this.loadFromQueryParams();

    effect(() => {
      void this._priceService.abonnement();
      void this._priceService.car();
      void this._priceService.trip();
      void this._priceService.kilometers();
      void this._priceService.startDate();
      void this._priceService.endDate();
      void this._priceService.hasDepositPaid();

      this.updateUrlParams();
    });
  }

  private loadFromQueryParams() {
    const abonnementQueryParam$ = this._queryParamsService.getQueryParams$(
      calculatorQueryParams.abonnement
    );
    const carQueryParam$ = this._queryParamsService.getQueryParams$(
      calculatorQueryParams.car
    );
    const tripQueryParam$ = this._queryParamsService.getQueryParams$(
      calculatorQueryParams.trip
    );
    const kilometersQueryParam$ = this._queryParamsService.getQueryParams$(
      calculatorQueryParams.kilometers
    );
    const startDateQueryParam$ = this._queryParamsService.getQueryParams$(
      calculatorQueryParams.startDate
    );
    const endDateQueryParam$ = this._queryParamsService.getQueryParams$(
      calculatorQueryParams.endDate
    );
    const hasDepositPaidQueryParam$ = this._queryParamsService.getQueryParams$(
      calculatorQueryParams.hasDepositPaid
    );

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
        // TODO: Implement daterange functionality
        // if (startDateQueryParam$) {
        //   this._priceService.daterange.startDate = startDateQueryParam$;
        // }
        // if (endDateQueryParam$) {
        //   this._priceService.daterange.endDate = endDateQueryParam$;
        // }

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

  /**
   * Safely converts a string to AbonnementOptionsEnum
   */
  private parseAbonnementEnum(value: string): AbonnementOptionsEnum | null {
    return this._parseEnum(value, Object.values(AbonnementOptionsEnum));
  }

  /**
   * Safely converts a string to AutoOptionsEnum
   */
  private parseAutoEnum(value: string): AutoOptionsEnum | null {
    return Object.values(AutoOptionsEnum).includes(value as AutoOptionsEnum)
      ? (value as AutoOptionsEnum)
      : null;
  }

  /**
   * Safely converts a string to TripOptionsEnum
   */
  private parseTripEnum(value: string): TripOptionsEnum | null {
    return Object.values(TripOptionsEnum).includes(value as TripOptionsEnum)
      ? (value as TripOptionsEnum)
      : null;
  }

  private _updateQueryParams() {
    const queryParams: Params = {
      [calculatorQueryParams.abonnement]: this._priceService.abonnement(),
      [calculatorQueryParams.car]: this._priceService.car(),
      [calculatorQueryParams.trip]: this._priceService.trip(),
      [calculatorQueryParams.kilometers]: this._priceService.kilometers(),
      // TODO: Implement daterange functionality
      // [calculatorQueryParams.startDate]: this.daterange.startDate,
      // [calculatorQueryParams.endDate]: this.daterange.endDate,
      [calculatorQueryParams.hasDepositPaid]:
        this._priceService.hasDepositPaid(),
    };

    this._queryParamsService.updateQueryParams$(queryParams).subscribe();
  }

  updateUrlParams() {
    this._updateQueryParams();
  }
}
