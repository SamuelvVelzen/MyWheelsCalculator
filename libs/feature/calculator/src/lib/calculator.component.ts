import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  FieldsetComponent,
  InputDaterangeComponent,
  SliderNumberComponent,
  ToggleButtonComponent,
} from '@mwc/ui';
import { CurrencyPipe } from '@mwc/util';
import { PeriodService } from './_services/period.service';
import { PriceService } from './_services/price.service';
import { AbonnementOptionsEnum } from './_types/AbonnementOptionsEnum';
import { AbonnementSelectComponent } from './abonnement-select/abonnement-select.component';
import { CarSelectComponent } from './car-select/car-select.component';
import { PriceComponent } from './price/price.component';
import { TripSelectComponent } from './trip-select/trip-select.component';

@Component({
  selector: 'mwc-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  standalone: true,
  imports: [
    SliderNumberComponent,
    FormsModule,
    CommonModule,
    PriceComponent,
    AbonnementSelectComponent,
    CarSelectComponent,
    TripSelectComponent,
    ToggleButtonComponent,
    FieldsetComponent,
    CurrencyPipe,
    InputDaterangeComponent,
  ],
})
export class CalculatorComponent {
  private readonly _priceService = inject(PriceService);
  private readonly _periodService = inject(PeriodService);

  abbonementOptionsEnum = AbonnementOptionsEnum;

  chosenAbonnement = this._priceService.abonnement;
  chosenCar = this._priceService.car;
  chosenTrip = this._priceService.trip;

  kilometers = this._priceService.kilometers;

  hasDepositPaid = this._priceService.hasDepositPaid;
  depositPrice = PriceService.depositPrice;
  hasStartPrice = this._priceService.hasStartPrice;
  startPrice = PriceService.startPrice;

  dateRange = computed(() => ({
    startDate: this._periodService.startDate().toISOString(),
    endDate: this._periodService.endDate().toISOString(),
  }));

  setDateRange(dateRange: { startDate: string; endDate: string }): void {
    this._periodService.startDate.set(new Date(dateRange.startDate));
    this._periodService.endDate.set(new Date(dateRange.endDate));
  }
}
