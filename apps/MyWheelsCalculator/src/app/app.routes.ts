import { Route } from '@angular/router';
import { CalculatorComponent } from '@mwc/calculator';

export const appRoutes: Route[] = [
  {
    path: '',
    component: CalculatorComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
