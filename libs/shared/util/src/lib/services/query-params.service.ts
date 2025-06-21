import { DOCUMENT } from '@angular/common';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, from, map, Observable, tap } from 'rxjs';
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

  updateQueryParams$(params: Params): Observable<boolean> {
    const scrollTop =
      this._window.scrollY || this._document.documentElement.scrollTop;

    return from(
      this._router.navigate([], {
        relativeTo: this._activatedRoute,
        queryParams: params,
        queryParamsHandling: 'merge',
        replaceUrl: true,
      })
    ).pipe(
      tap(() => {
        if (this._window.scrollTo) {
          this._window.scrollTo(0, scrollTop);
        }
      }),
      takeUntilDestroyed(this._destroyRef)
    );
  }

  getQueryParams$(key: string): Observable<string | null> {
    return this._activatedRoute.queryParams.pipe(
      map((params) => params[key]),
      filter((value) => value !== undefined)
    );
  }
}
