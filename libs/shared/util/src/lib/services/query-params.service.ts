import { DOCUMENT } from '@angular/common';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { from, map, Observable, tap } from 'rxjs';
import { DateQueryParamsHelpers } from '../helpers/dateQueryParams.helpers';
import { QueryParamsHelpers } from '../helpers/query-params.helpers';
import { WINDOW } from '../injectiontokens/window';

@Injectable({
  providedIn: 'root',
})
export class QueryParamsService {
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _window = inject(WINDOW);
  private readonly _document = inject(DOCUMENT);
  private readonly _destroyRef = inject(DestroyRef);

  updateQueryParams$(
    params: Params,
    options?: { scrollToTop?: boolean; mode?: 'single' | 'multiple' }
  ): Observable<boolean> {
    const scrollTop =
      this._window.scrollY || this._document.documentElement.scrollTop;

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
        if (this._window.scrollTo && !options?.scrollToTop) {
          this._window.scrollTo(0, scrollTop);
        }
      }),
      takeUntilDestroyed(this._destroyRef)
    );
  }

  getQueryParams$(
    key: string,
    options: { multiple: true; parseDate: true }
  ): Observable<Date[]>;
  getQueryParams$(
    key: string,
    options: { multiple: true; parseDate?: false }
  ): Observable<string[]>;
  getQueryParams$(
    key: string,
    options: { multiple?: false; parseDate: true }
  ): Observable<Date | null>;
  getQueryParams$(
    key: string,
    options?: { multiple?: false; parseDate?: false }
  ): Observable<string | null>;
  getQueryParams$(
    key: string,
    options?: { multiple?: boolean; parseDate?: boolean }
  ): Observable<string | null | string[] | Date | Date[]> {
    return this._activatedRoute.queryParams.pipe(
      map((params) => {
        const value = params[key];

        // Handle multiple dates
        if (options?.multiple && options.parseDate) {
          const stringArray = QueryParamsHelpers.decodeArray(value);
          return stringArray
            .map((dateStr) => DateQueryParamsHelpers.decodeDate(dateStr))
            .filter((date): date is Date => date !== null);
        }

        // Handle multiple strings
        if (options?.multiple) {
          return QueryParamsHelpers.decodeArray(value);
        }

        // Handle single date
        if (options?.parseDate) {
          return value ? DateQueryParamsHelpers.decodeDate(value) : null;
        }

        return value;
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
          valueToMap = QueryParamsHelpers.encodeArray(valueToMap);
        }

        return [key, valueToMap];
      })
    );
  }
}
