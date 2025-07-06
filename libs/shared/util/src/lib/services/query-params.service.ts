import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { from, map, Observable, tap } from 'rxjs';
import { DateQueryParamsHelpers } from '../helpers/dateQueryParams.helpers';
import { QueryParamsHelpers } from '../helpers/query-params.helpers';
import { ScrollService } from './scroll.service';

@Injectable({
  providedIn: 'root',
})
export class QueryParamsService {
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _scrollService = inject(ScrollService);

  updateQueryParams$(
    params: Params,
    options?: { scrollToTop?: boolean; mode?: 'single' | 'multiple' }
  ): Observable<boolean> {
    const mappedParams = this._mapParams(params, options?.mode);

    return from(
      this._router.navigate([], {
        relativeTo: this._activatedRoute,
        queryParams: mappedParams,
        queryParamsHandling: 'merge',
        replaceUrl: true,
      })
    ).pipe(
      tap(() => {
        if (options?.scrollToTop) {
          this._scrollService.scrollToTop();
        }
      }),
      takeUntilDestroyed(this._destroyRef)
    );
  }

  getQueryParams$(
    key: string,
    options: { parseDate: true }
  ): Observable<Date[]>;
  getQueryParams$(
    key: string,
    options?: { parseDate?: false }
  ): Observable<string[]>;
  getQueryParams$(
    key: string,
    options?: { parseDate?: boolean }
  ): Observable<string[] | Date[]> {
    return this._activatedRoute.queryParams.pipe(
      map((params) => {
        const value = params[key];

        // Handle multiple dates
        if (options?.parseDate) {
          const stringArray = QueryParamsHelpers.decodeArray(value);
          return stringArray
            .map((dateStr) => DateQueryParamsHelpers.decodeDate(dateStr))
            .filter((date): date is Date => date !== null);
        }

        // Handle multiple strings
        return QueryParamsHelpers.decodeArray(value);
      })
    );
  }

  private _mapParams(params: Params, mode?: 'single' | 'multiple'): Params {
    return Object.fromEntries(
      Object.entries(params).map(([key, value]) => {
        let valueToMap = value;

        if (valueToMap instanceof Date) {
          valueToMap = DateQueryParamsHelpers.encodeDate(valueToMap);
        }

        if (mode === 'multiple') {
          if (
            Array.isArray(valueToMap) &&
            valueToMap.every((val) => val instanceof Date)
          ) {
            valueToMap = valueToMap.map((val) =>
              DateQueryParamsHelpers.encodeDate(val)
            );
          }

          valueToMap = QueryParamsHelpers.encodeArray(valueToMap);
        }

        return [key, valueToMap];
      })
    );
  }
}
