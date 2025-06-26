import { Component, input, linkedSignal, output, signal } from '@angular/core';
import { IRoute } from '../../_types/routes.interface';
import { RouteListItemEditComponent } from '../route-list-item-edit/route-list-item-edit.component';

@Component({
  selector: 'mwc-route-list-item',
  templateUrl: './route-list-item.component.html',
  styleUrls: ['./route-list-item.component.css'],
  imports: [RouteListItemEditComponent],
})
export class RouteListItemComponent {
  isEditMode = signal(false);

  route = input.required<IRoute>();
  index = input.required<number>();

  copiedRoute = linkedSignal(() => ({ ...this.route() }));

  saved = output<IRoute>();

  onSave(route: IRoute) {
    this.saved.emit(route);
    this.isEditMode.set(false);
  }

  onCancel() {
    this.copiedRoute.set({ ...this.route() });
    this.isEditMode.set(false);
  }
}
