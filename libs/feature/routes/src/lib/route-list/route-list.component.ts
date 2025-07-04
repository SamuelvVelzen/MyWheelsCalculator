import { Component, inject, input, output } from '@angular/core';
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

  routes = input.required<IRoute[]>();

  showAddButton = this._routeService.showAddButton;

  added = output<void>();
  saved = output<{ route: IRoute; index: number }>();
  deleted = output<number>();

  addNewRoute(): void {
    this.added.emit();
  }

  onSave(route: IRoute, index: number): void {
    this.saved.emit({ route, index });
  }

  onRemove(index: number): void {
    this.deleted.emit(index);
  }
}
