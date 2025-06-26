import { Component, input, output } from '@angular/core';
import { IRoute } from '../_types/routes.interface';
import { RouteListItemComponent } from './route-list-item/route-list-item.component';

@Component({
  selector: 'mwc-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css'],
  imports: [RouteListItemComponent],
})
export class RouteListComponent {
  routes = input.required<IRoute[]>();

  savedRoute = output<IRoute>();

  onSave(route: IRoute, index: number) {
    const routes = this.routes();

    routes[index] = route;

    this.savedRoute.emit(route);
  }
}
