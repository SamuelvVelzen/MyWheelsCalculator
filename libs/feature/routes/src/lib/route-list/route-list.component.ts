import { Component, inject } from '@angular/core';
import { ButtonComponent } from '@mwc/ui';
import { RouteService } from '../_services/route.service';
import { IRoute } from '../_types/routes.interface';
import { RouteListItemComponent } from './route-list-item/route-list-item.component';

@Component({
  selector: 'mwc-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css'],
  imports: [RouteListItemComponent, ButtonComponent],
})
export class RouteListComponent {
  private readonly _routeService = inject(RouteService);

  routes = this._routeService.routes;
  showAddButton = this._routeService.showAddButton;

  addNewRoute(): void {
    this._routeService.addNewRoute();
  }

  onSave(route: IRoute, index: number): void {
    this._routeService.updateRoute(route, index);
  }

  onRemove(index: number): void {
    this._routeService.removeRoute(index);
  }
}
