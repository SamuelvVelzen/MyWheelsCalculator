import { Route } from '@angular/router';
import { CalculatorComponent } from '@mwc/calculator';
import { MainLayoutComponent } from './main-layout/main-layout.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: MainLayoutComponent,
    pathMatch: 'full',
    children: [{ path: '', component: CalculatorComponent, pathMatch: 'full' }],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
