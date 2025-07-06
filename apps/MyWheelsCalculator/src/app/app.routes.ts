import { Route } from '@angular/router';
import { CalculatorComponent } from '@mwc/calculator';
import { hasRoutesGuard, RoutesComponent } from '@mwc/routes';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HowItWorksPageComponent } from './pages/how-it-works-page/how-it-works-page.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'routes',
        component: RoutesComponent,
        pathMatch: 'full',
        canDeactivate: [hasRoutesGuard],
      },
      {
        path: 'how-it-works',
        component: HowItWorksPageComponent,
      },
      { path: '', component: CalculatorComponent },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
