import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbonnementOptionsEnum,
  AutoOptionsEnum,
  TripOptionsEnum,
} from '@mwc/calculator';
import { IRoute } from '../_types/routes.interface';
import { RouteListComponent } from '../route-list/route-list.component';

@Component({
  selector: 'mwc-routes',
  imports: [CommonModule, RouteListComponent],
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.css',
})
export class RoutesComponent {
  routes: IRoute[] = [
    {
      abonnement: AbonnementOptionsEnum.Start,
      car: AutoOptionsEnum.Comfort,
      trip: TripOptionsEnum.Fifty,
      kilometers: 10000,
      hasDepositPaid: true,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      abonnement: AbonnementOptionsEnum.Start,
      car: AutoOptionsEnum.Comfort,
      trip: TripOptionsEnum.None,
      kilometers: 10000,
      hasDepositPaid: true,
      startDate: new Date(),
      endDate: new Date(),
    },
  ];
}
