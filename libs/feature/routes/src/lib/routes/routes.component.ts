import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '@mwc/ui';
import { RouteQueryParamsService } from '../_services/route-query-params.service';
import { RouteService } from '../_services/route.service';
import { RouteListComponent } from '../route-list/route-list.component';

@Component({
  selector: 'mwc-routes',
  imports: [CommonModule, RouteListComponent, ButtonComponent],
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.css',
})
export class RoutesComponent {
  private readonly _routeQueryParamsService = inject(RouteQueryParamsService);
  private readonly _routeService = inject(RouteService);

  routes = this._routeQueryParamsService.routes;

  showAddButton = this._routeService.showAddButton;

  addNewRoute(): void {
    this._routeService.addNewRoute();
  }
}
