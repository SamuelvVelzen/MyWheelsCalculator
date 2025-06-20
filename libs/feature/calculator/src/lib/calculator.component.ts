import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  FieldsetComponent,
  SliderNumberComponent,
  ToggleButtonComponent,
} from '@mwc/ui';
import { CurrencyPipe } from '@mwc/util';
import { from, tap } from 'rxjs';
import { calculatorQueryParams } from '../calculator.query-params';
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
  ],
})
export class CalculatorComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  priceService = inject(PriceService);

  abbonementOptionsEnum = AbonnementOptionsEnum;

  chosenAbonnement = this.priceService.abonnement;
  chosenCar = this.priceService.car;
  chosenTrip = this.priceService.trip;

  kilometers = this.priceService.kilometers;
  hours = this.priceService.hours;

  hasDepositPaid = this.priceService.hasDepositPaid;
  depositPrice = PriceService.depositPrice;
  hasStartPrice = this.priceService.hasStartPrice;
  startPrice = PriceService.startPrice;

  constructor() {
    this.loadFromQueryParams();

    effect(() => {
      void this.chosenAbonnement();
      void this.chosenCar();
      void this.chosenTrip();
      void this.kilometers();
      void this.hours();
      void this.hasDepositPaid();

      this.updateUrlParams();
    });
  }

  private loadFromQueryParams() {
    this.route.queryParams.pipe(takeUntilDestroyed()).subscribe((params) => {
      if (params[calculatorQueryParams.abonnement]) {
        this.chosenAbonnement.set(params[calculatorQueryParams.abonnement]);
      }
      if (params[calculatorQueryParams.car]) {
        this.chosenCar.set(params[calculatorQueryParams.car]);
      }
      if (params[calculatorQueryParams.trip]) {
        this.chosenTrip.set(params[calculatorQueryParams.trip]);
      }
      if (params['kilometers']) {
        this.kilometers.set(Number(params['kilometers']));
      }
      if (params['hours']) {
        this.hours.set(Number(params['hours']));
      }
      if (params['hasDepositPaid']) {
        this.hasDepositPaid.set(params['hasDepositPaid'] === 'true');
      }
    });
  }

  private _updateQueryParams() {
    const queryParams: Params = {
      [calculatorQueryParams.abonnement]: this.chosenAbonnement(),
      [calculatorQueryParams.car]: this.chosenCar(),
      [calculatorQueryParams.trip]: this.chosenTrip(),
      [calculatorQueryParams.kilometers]: this.kilometers(),
      [calculatorQueryParams.hours]: this.hours(),
      [calculatorQueryParams.hasDepositPaid]: this.hasDepositPaid(),
    };

    // Store current scroll position
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    from(
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: queryParams,
        queryParamsHandling: 'merge',
        replaceUrl: true,
      })
    )
      .pipe(tap(() => window.scrollTo(0, scrollTop)))
      .subscribe();
  }

  updateUrlParams() {
    this._updateQueryParams();
  }
}
