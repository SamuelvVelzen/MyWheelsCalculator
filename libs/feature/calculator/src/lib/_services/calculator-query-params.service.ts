import { DestroyRef, effect, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Params } from '@angular/router';
import { EnumHelpers, QueryParamsService } from '@mwc/util';
import { debounceTime, forkJoin, take } from 'rxjs';
import { calculatorQueryParams } from '../../calculator.query-params';
import { AbonnementOptionsEnum } from '../_types/AbonnementOptionsEnum';
import { AutoOptionsEnum } from '../_types/AutoOptionsEnum';
import { TripOptionsEnum } from '../_types/TripOptionsEnum';
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
      void this._calculatorService.abonnement();
      void this._calculatorService.car();
      void this._calculatorService.trip();
      void this._calculatorService.kilometers();
      void this._periodService.startDate();
      void this._periodService.endDate();
      void this._calculatorService.hasDepositPaid();

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
            abonnementQueryParam$,
            AbonnementOptionsEnum
          );

          if (abonnementValue) {
            this._calculatorService.abonnement.set(abonnementValue);
          }

          const carValue = EnumHelpers.parseEnumFromObject(
            carQueryParam$,
            AutoOptionsEnum
          );

          if (carValue) {
            this._calculatorService.car.set(carValue);
          }

          const tripValue = EnumHelpers.parseEnumFromObject(
            tripQueryParam$,
            TripOptionsEnum
          );

          if (tripValue) {
            this._calculatorService.trip.set(tripValue);
          }

          if (kilometersQueryParam$) {
            this._calculatorService.kilometers.set(
              Number(kilometersQueryParam$)
            );
          }
          if (startDateQueryParam$) {
            this._periodService.startDate.set(new Date(startDateQueryParam$));
          }
          if (endDateQueryParam$) {
            this._periodService.endDate.set(new Date(endDateQueryParam$));
          }

          if (hasDepositPaidQueryParam$) {
            this._calculatorService.hasDepositPaid.set(
              hasDepositPaidQueryParam$ === 'true'
            );
          }
        }
      );
  }

  private _updateQueryParams() {
    const queryParams: Params = {
      [calculatorQueryParams.abonnement]: this._calculatorService.abonnement(),
      [calculatorQueryParams.car]: this._calculatorService.car(),
      [calculatorQueryParams.trip]: this._calculatorService.trip(),
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
}
