import { Component, input, output } from '@angular/core';
import { TranslatePipe } from '@mwc/util';
import { IRoute } from '../_types/routes.interface';
import { RouteListItemComponent } from './route-list-item/route-list-item.component';

@Component({
  selector: 'mwc-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css'],
  imports: [RouteListItemComponent, TranslatePipe],
})
export class RouteListComponent {
  routes = input.required<IRoute[]>();

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
