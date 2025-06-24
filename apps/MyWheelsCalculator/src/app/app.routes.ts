import { Route } from '@angular/router';
import { CalculatorComponent, RoutesComponent } from '@mwc/calculator';
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
