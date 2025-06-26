import { Component, computed, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AbonnementSelectComponent,
  CalculatorService,
  CarSelectComponent,
  ExtraCostsComponent,
  PriceService,
  TripSelectComponent,
} from '@mwc/calculator';
import {
  FieldsetComponent,
  InputDaterangeComponent,
  SliderNumberComponent,
  ToggleButtonComponent,
} from '@mwc/ui';
import { CurrencyPipe, TranslatePipe } from '@mwc/util';
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
    FieldsetComponent,
    ToggleButtonComponent,
    FormsModule,
    TranslatePipe,
    CurrencyPipe,
    ExtraCostsComponent,
  ],
})
export class RouteListItemEditComponent {
  private readonly _priceService = inject(PriceService);
  private readonly _calculatorService = inject(CalculatorService);

  route = input.required<IRoute>();

  startPrice = PriceService.startPrice;
  depositPrice = PriceService.depositPrice;

  saved = output<IRoute>();
  cancelled = output<void>();

  dateRange = computed(() => {
    return {
      startDate: this.route().startDate,
      endDate: this.route().endDate,
    };
  });

  hasStartPrice = computed(() =>
    this._calculatorService.calculateHasStartPrice(
      this.route().abonnement,
      this.route().trip
    )
  );

  setDateRange(dateRange: { startDate: Date; endDate: Date }) {
    this.route().startDate = dateRange.startDate;
    this.route().endDate = dateRange.endDate;
  }
}
