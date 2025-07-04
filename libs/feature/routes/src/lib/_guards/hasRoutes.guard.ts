import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { DialogService } from '@mwc/ui';
import { RouteService } from '../_services/route.service';

export const hasRoutesGuard: CanDeactivateFn<unknown> = () => {
  const _routeService = inject(RouteService);
  const _dialogService = inject(DialogService);

  const hasMoreThanOneRoute = _routeService.routes().length > 1;

  if (hasMoreThanOneRoute) {
    return _dialogService.open(
      'You have more than one route. Are you sure you want to leave?'
    );
  }

  return hasMoreThanOneRoute;
};
