import { Route } from '@angular/router';
import { CalculatorComponent } from '@mwc/calculator';
import { RoutesComponent } from '@mwc/routes';
import { MainLayoutComponent } from './main-layout/main-layout.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'routes', component: RoutesComponent, pathMatch: 'full' },
      { path: '', component: CalculatorComponent },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
