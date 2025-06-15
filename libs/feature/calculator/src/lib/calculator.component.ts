import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  FieldsetComponent,
  SliderNumberComponent,
  ToggleButtonComponent,
} from '@mwc/ui';
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
  ],
})
export class CalculatorComponent {
  priceService = inject(PriceService);

  abbonementOptionsEnum = AbonnementOptionsEnum;

  chosenAbonnement = this.priceService.abonnement;
  chosenCar = this.priceService.car;
  chosenTrip = this.priceService.trip;

  kilometers = this.priceService.kilometers;
  hours = this.priceService.hours;

  hasStartPrice = this.priceService.hasStartPrice;
  hasDepositPaid = this.priceService.hasDepositPaid;
}
