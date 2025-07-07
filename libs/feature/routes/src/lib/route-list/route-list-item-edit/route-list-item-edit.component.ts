import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AbonnementSelectComponent,
  CalculatorService,
  CarSelectComponent,
  ExtraCostsComponent,
  PeriodService,
  PriceService,
  TripSelectComponent,
} from '@mwc/calculator';
import {
  ButtonComponent,
  InputDaterangeComponent,
  SliderNumberComponent,
} from '@mwc/ui';
import { TranslatePipe } from '@mwc/util';
import { IRoute } from '../../_types/routes.interface';

@Component({
  selector: 'mwc-route-list-item-edit',
  templateUrl: './route-list-item-edit.component.html',
  styleUrls: ['./route-list-item-edit.component.css'],
  imports: [
    AbonnementSelectComponent,
    CarSelectComponent,
    SliderNumberComponent,
    InputDaterangeComponent,
    TripSelectComponent,
    FormsModule,
    TranslatePipe,
    ExtraCostsComponent,
    ButtonComponent,
    CommonModule,
  ],
})
export class RouteListItemEditComponent {
  private readonly _periodService = inject(PeriodService);
  private readonly _calculatorService = inject(CalculatorService);

  route = input.required<IRoute>();
  editedRoute = linkedSignal(() => ({
    ...this.route(),
  }));

  startPrice = PriceService.startPrice;
  depositPrice = PriceService.depositPrice;
  step = PeriodService.roundToNearestStep;

  saved = output<IRoute>();
  cancelled = output<void>();

  dateRange = computed(() => {
    return {
      startDate: this.editedRoute().startDate,
      endDate: this.editedRoute().endDate,
    };
  });

  totalPeriodTimeString = computed(() =>
    this._periodService.getFormattedPeriodTime(
      this.dateRange().startDate,
      this.dateRange().endDate
    )
  );

  setDateRange(dateRange: { startDate: Date; endDate: Date }) {
    this.editedRoute.update((route) => ({
      ...route,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    }));
  }

  updateTrip() {
    console.log('updateTrip');
    const calculatedTrip = this._calculateTrip();

    this.editedRoute.update((route) => ({
      ...route,
      trip: calculatedTrip,
    }));
  }

  private _calculateTrip() {
    const originalTrip = this.editedRoute().trip;
    const calculatedTrip = this._calculatorService.getClosedTrip(
      this.editedRoute().kilometers,
      this.editedRoute().abonnement,
      this.editedRoute().car
    );

    return originalTrip === calculatedTrip ? originalTrip : calculatedTrip;
  }
}
