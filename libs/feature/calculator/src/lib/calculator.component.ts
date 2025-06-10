import { CommonModule } from '@angular/common';
import { Component, computed, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonsCardComponent, SliderNumberComponent } from '@mwc/ui';
import { CurrencyPipe } from '@mwc/util';
import { AbonnementOptionsEnum } from './_types/AbonnementOptionsEnum';
import { AutoOptions, AutoOptionsEnum } from './_types/AutoOptionsEnum';
import { TripOptions, TripOptionsEnum } from './_types/TripOptionsEnum';
import { CalculatorCardComponent } from './calculator-card/calculator-card.component';

@Component({
  selector: 'mwc-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  standalone: true,
  imports: [
    SliderNumberComponent,
    FormsModule,
    RadioButtonsCardComponent,
    CommonModule,
    RadioButtonsCardComponent,
    CurrencyPipe,
    CalculatorCardComponent,
  ],
})
export class CalculatorComponent {
  tripConfig = TripOptions;

  kilometers = model<number>(1);
  hours = model<number>(1);

  castFn = (value: unknown) => value as TripOptionsEnum;

  abbonementOptions = AbonnementOptionsEnum;

  options = [
    {
      value: AbonnementOptionsEnum.Start,
      title: 'Start',
      discount: 0,
      price: 'Gratis',
    },
    {
      value: AbonnementOptionsEnum.Plus,
      title: 'Plus',
      discount: 10,
      price: '10',
    },
    {
      value: AbonnementOptionsEnum.Pro,
      title: 'Pro',
      discount: 25,
      price: '25',
    },
  ];
  test = model<(typeof this.options)[0]>(this.options[0]);

  carOptions = computed(() => [
    {
      value: AutoOptionsEnum.Compact,
      title: 'Compact',
      kmPrice: AutoOptions[this.test().value][AutoOptionsEnum.Compact].kmPrice,
      hourPrice:
        AutoOptions[this.test().value][AutoOptionsEnum.Compact].hourPrice,
    },
    {
      value: AutoOptionsEnum.Comfort,
      title: 'Comfort',
      kmPrice: AutoOptions[this.test().value][AutoOptionsEnum.Comfort].kmPrice,
      hourPrice:
        AutoOptions[this.test().value][AutoOptionsEnum.Comfort].hourPrice,
    },
    {
      value: AutoOptionsEnum.Extra,
      title: 'Extra',
      kmPrice: AutoOptions[this.test().value][AutoOptionsEnum.Extra].kmPrice,
      hourPrice:
        AutoOptions[this.test().value][AutoOptionsEnum.Extra].hourPrice,
    },
    {
      value: AutoOptionsEnum.Premium,
      title: 'Premium',
      kmPrice: AutoOptions[this.test().value][AutoOptionsEnum.Premium].kmPrice,
      hourPrice:
        AutoOptions[this.test().value][AutoOptionsEnum.Premium].hourPrice,
    },
  ]);

  chosenCar = model(this.carOptions()[0]);

  tripOptions = signal([
    {
      value: TripOptionsEnum.None,
      title: 'Geen',
    },
    {
      value: TripOptionsEnum.TwentyFive,
      title: '25 km',
    },
    {
      value: TripOptionsEnum.Fifty,
      title: '50 km',
    },
    {
      value: TripOptionsEnum.Hundred,
      title: '100 km',
    },
    {
      value: TripOptionsEnum.TwoHundred,
      title: '200 km',
    },
    {
      value: TripOptionsEnum.FourHundred,
      title: '400 km',
    },
    {
      value: TripOptionsEnum.Thousand,
      title: '1000 km',
    },
    {
      value: TripOptionsEnum.SecondThousand,
      title: '2000 km',
    },
  ]);

  chosenTrip = model(this.tripOptions()[0]);

  hoursPrice = computed(() => {
    const chosenCar = this.chosenCar();

    return chosenCar.hourPrice * this.hours();
  });

  kilometersPrice = computed(() => {
    const kilometers = this.kilometers();
    const chosenCar = this.chosenCar();
    return kilometers * chosenCar.kmPrice;
  });

  basePrice = computed(() => {
    const chosenTrip = this.chosenTrip().value;
    const chosenTripPrice = this.tripConfig[chosenTrip].price;

    const kilometersPrice = this.kilometersPrice();
    const hoursPrice = this.hoursPrice();

    console.log(kilometersPrice, hoursPrice, kilometersPrice + hoursPrice);

    return (
      Math.round((kilometersPrice + hoursPrice + chosenTripPrice) * 100) / 100
    );
  });

  startPrice = 1.5;

  totalPrice = computed(() => {
    const basePrice = this.basePrice();

    const START_PRICE = this.startPrice;

    const abbonementValue = this.test().value;

    if (abbonementValue === AbonnementOptionsEnum.Start) {
      return basePrice + START_PRICE;
    }

    if (abbonementValue === AbonnementOptionsEnum.Plus) {
      return basePrice * 0.9;
    }

    if (abbonementValue === AbonnementOptionsEnum.Pro) {
      return basePrice * 0.75;
    }

    return -1;
  });
}
