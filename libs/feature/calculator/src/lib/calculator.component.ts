import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  FieldsetComponent,
  InputDaterangeComponent,
  SliderNumberComponent,
  ToggleButtonComponent,
} from '@mwc/ui';
import {
  CurrencyPipe,
  LanguageEnum,
  TranslatePipe,
  TranslateService,
  UrlService,
} from '@mwc/util';
import { CalculatorQueryParamsService } from './_services/calculator-query-params.service';
import { CalculatorService } from './_services/calculator.service';
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
    TranslatePipe,
    InputDaterangeComponent,
  ],
})
export class CalculatorComponent {
  private readonly _calculatorService = inject(CalculatorService);
  private readonly _periodService = inject(PeriodService);
  private readonly _calculatorQueryParamsService = inject(
    CalculatorQueryParamsService
  );
  private readonly _translateService = inject(TranslateService);
  private readonly _urlService = inject(UrlService);

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

  depositPriceUrl = this._urlService.getUrlBasedOnLanguage({
    [LanguageEnum.EN]:
      'https://help.mywheels.nl/hc/en-nl/articles/5464626156828-Can-I-reduce-my-deductible',
    [LanguageEnum.NL]:
      'https://help.mywheels.nl/hc/nl/articles/5464626156828-Kan-ik-het-eigen-risico-verlagen',
  });

  startPriceUrl = this._urlService.getUrlBasedOnLanguage({
    [LanguageEnum.EN]: 'https://mywheels.nl/en/tarieven/abonnementen',
    [LanguageEnum.NL]: 'https://mywheels.nl/tarieven/abonnementen',
  });

  discountLabel = computed(
    () =>
      `${this._translateService.translate(
        'calculator.trip.period'
      )} (${this._periodService.totalPeriodTimeString()})`
  );

  constructor() {
    this._calculatorQueryParamsService.init();
  }

  setDateRange(dateRange: { startDate: Date; endDate: Date }): void {
    this._periodService.startDate.set(dateRange.startDate);
    this._periodService.endDate.set(dateRange.endDate);
  }
}
