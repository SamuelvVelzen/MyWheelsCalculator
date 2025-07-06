import { CommonModule } from '@angular/common';
import { Component, computed, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputDaterangeComponent, SliderNumberComponent } from '@mwc/ui';
import { TranslatePipe } from '@mwc/util';
import { CalculatorQueryParamsService } from './_services/calculator-query-params.service';
import { CalculatorService } from './_services/calculator.service';
import { PeriodService } from './_services/period.service';
import { IPriceDetail, PriceService } from './_services/price.service';
import { AbonnementOptionsEnum } from './_types/AbonnementOptionsEnum';
import { AbonnementSelectComponent } from './abonnement-select/abonnement-select.component';
import { CarSelectComponent } from './car-select/car-select.component';
import { ExtraCostsComponent } from './extra-costs/extra-costs.component';
import { PriceTotalComponent } from './price-total/price-total.component';
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
    TranslatePipe,
    InputDaterangeComponent,
    ExtraCostsComponent,
    PriceTotalComponent,
  ],
})
export class CalculatorComponent {
  priceDetails = viewChild.required<PriceComponent>('priceDetailsEl');

  private readonly _calculatorService = inject(CalculatorService);
  private readonly _periodService = inject(PeriodService);
  private readonly _priceService = inject(PriceService);
  private readonly _calculatorQueryParamsService = inject(
    CalculatorQueryParamsService
  );

  abbonementOptionsEnum = AbonnementOptionsEnum;

  chosenAbonnement = this._calculatorService.abonnement;
  chosenCar = this._calculatorService.car;
  chosenTrip = this._calculatorService.trip;

  kilometers = this._calculatorService.kilometers;

  hasDepositPaid = this._calculatorService.hasDepositPaid;
  depositPrice = PriceService.depositPrice;
  hasStartPrice = this._calculatorService.hasStartPrice;
  startPrice = PriceService.startPrice;

  step = PeriodService.roundToNearestStep;

  dateRange = computed(() => ({
    startDate: this._periodService.startDate(),
    endDate: this._periodService.endDate(),
  }));

  totalPeriodTimeString = computed(() =>
    this._periodService.getFormattedPeriodTime(
      this._calculatorService.startDate(),
      this._calculatorService.endDate()
    )
  );

  priceDetail = computed(
    (): IPriceDetail =>
      this._priceService.calculatePrice({
        abonnement: this._calculatorService.abonnement(),
        trip: this._calculatorService.trip(),
        car: this._calculatorService.car(),
        kilometers: this._calculatorService.kilometers(),
        hasStartPrice: this._calculatorService.hasStartPrice(),
        hasDepositPaid: this._calculatorService.hasDepositPaid(),
        startDate: this._calculatorService.startDate(),
        endDate: this._calculatorService.endDate(),
      })
  );

  constructor() {
    this._calculatorQueryParamsService.init();
  }

  setDateRange(dateRange: { startDate: Date; endDate: Date }): void {
    this._periodService.startDate.set(dateRange.startDate);
    this._periodService.endDate.set(dateRange.endDate);
  }

  showDetails(): void {
    this.priceDetails().showDetails();
  }
}
