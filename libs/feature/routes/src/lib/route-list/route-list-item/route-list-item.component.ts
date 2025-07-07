import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';
import { PeriodService } from '@mwc/calculator';
import { BadgeComponent, IconButtonComponent } from '@mwc/ui';
import { TranslatePipe } from '@mwc/util';
import { tablerPencil, tablerTrash } from '@ng-icons/tabler-icons';
import { IRoute } from '../../_types/routes.interface';
import { RouteListItemEditComponent } from '../route-list-item-edit/route-list-item-edit.component';

@Component({
  selector: 'mwc-route-list-item',
  templateUrl: './route-list-item.component.html',
  styleUrls: ['./route-list-item.component.css'],
  imports: [
    RouteListItemEditComponent,
    IconButtonComponent,
    BadgeComponent,
    TranslatePipe,
    CommonModule,
  ],
})
export class RouteListItemComponent {
  private readonly _periodService = inject(PeriodService);

  isEditMode = signal(false);

  route = input.required<IRoute>();
  index = input.required<number>();

  tablerPencil = tablerPencil;
  tablerTrash = tablerTrash;

  copiedRoute = linkedSignal(() => ({ ...this.route() }));

  formattedPeriodTime = computed(() => {
    const totalHours = this._periodService.getFormattedPeriodTime(
      this.route().startDate,
      this.route().endDate
    );

    return totalHours;
  });

  saved = output<IRoute>();
  removed = output<void>();

  onSave(route: IRoute) {
    this.saved.emit(route);
    this.isEditMode.set(false);
  }

  onCancel() {
    this.copiedRoute.set({ ...this.route() });
    this.isEditMode.set(false);
  }
}
