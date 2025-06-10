import { CommonModule } from '@angular/common';
import { Component, computed, model } from '@angular/core';
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
  abbonementOptionsEnum = AbonnementOptionsEnum;

  kilometers = model<number>(1);
  hours = model<number>(1);

  castAbbonementFn = Helpers.castFn<AbonnementOptionsEnum>;
  castCarFn = Helpers.castFn<AutoOptionsEnum>;
  castTripFn = Helpers.castFn<TripOptionsEnum>;

  abonnementConfig: {
    [key in AbonnementOptionsEnum]: {
      title: string;
      discount: number;
      price: string;
    };
  } = {
    [AbonnementOptionsEnum.Start]: {
      title: 'Start',
      discount: 0,
      price: 'Gratis',
    },
    [AbonnementOptionsEnum.Plus]: {
      title: 'Plus',
      discount: 10,
      price: '10',
    },
    [AbonnementOptionsEnum.Pro]: {
      title: 'Pro',
      discount: 25,
      price: '25',
    },
  };

  chosenAbonnement = model(AbonnementOptionsEnum.Start);
  abonnementOptions = [
    AbonnementOptionsEnum.Start,
    AbonnementOptionsEnum.Plus,
    AbonnementOptionsEnum.Pro,
  ];

  carOptions = [
    AutoOptionsEnum.Compact,
    AutoOptionsEnum.Comfort,
    AutoOptionsEnum.Extra,
    AutoOptionsEnum.Premium,
  ];

  carConfig = computed(
    (): {
      [key in AutoOptionsEnum]: {
        title: string;
        kmPrice: number;
        hourPrice: number;
      };
    } => {
      return {
        [AutoOptionsEnum.Compact]: {
          title: 'Compact',
          kmPrice:
            AutoOptions[this.chosenAbonnement()][AutoOptionsEnum.Compact]
              .kmPrice,
          hourPrice:
            AutoOptions[this.chosenAbonnement()][AutoOptionsEnum.Compact]
              .hourPrice,
        },
        [AutoOptionsEnum.Comfort]: {
          title: 'Comfort',
          kmPrice:
            AutoOptions[this.chosenAbonnement()][AutoOptionsEnum.Comfort]
              .kmPrice,
          hourPrice:
            AutoOptions[this.chosenAbonnement()][AutoOptionsEnum.Comfort]
              .hourPrice,
        },
        [AutoOptionsEnum.Extra]: {
          title: 'Extra',
          kmPrice:
            AutoOptions[this.chosenAbonnement()][AutoOptionsEnum.Extra].kmPrice,
          hourPrice:
            AutoOptions[this.chosenAbonnement()][AutoOptionsEnum.Extra]
              .hourPrice,
        },
        [AutoOptionsEnum.Premium]: {
          title: 'Premium',
          kmPrice:
            AutoOptions[this.chosenAbonnement()][AutoOptionsEnum.Premium]
              .kmPrice,
          hourPrice:
            AutoOptions[this.chosenAbonnement()][AutoOptionsEnum.Premium]
              .hourPrice,
        },
      };
    }
  );

  chosenCar = model(this.carOptions[0]);

  tripOptions = [
    TripOptionsEnum.None,
    TripOptionsEnum.TwentyFive,
    TripOptionsEnum.Fifty,
    TripOptionsEnum.Hundred,
    TripOptionsEnum.TwoHundred,
    TripOptionsEnum.FourHundred,
    TripOptionsEnum.Thousand,
    TripOptionsEnum.SecondThousand,
  ];

  chosenTrip = model(this.tripOptions[0]);

  hoursPrice = computed(() => {
    const chosenCar = this.chosenCar();
    const hourPrice = this.carConfig()[this.castCarFn(chosenCar)].hourPrice;

    return hourPrice * this.hours();
  });

  kilometersPrice = computed(() => {
    const kilometers = this.kilometers();
    const chosenCar = this.chosenCar();
    const kmPrice = this.carConfig()[this.castCarFn(chosenCar)].kmPrice;

    return kilometers * kmPrice;
  });

  basePrice = computed(() => {
    const chosenTrip = this.chosenTrip();
    const chosenTripPrice = this.tripConfig[chosenTrip].price;

    const kilometersPrice = this.kilometersPrice();
    const hoursPrice = this.hoursPrice();

    return (
      Math.round((kilometersPrice + hoursPrice + chosenTripPrice) * 100) / 100
    );
  });

  startPrice = 1.5;

  totalPrice = computed(() => {
    const basePrice = this.basePrice();

    const START_PRICE = this.startPrice;

    const abbonementValue = this.chosenAbonnement();

    if (abbonementValue === AbonnementOptionsEnum.Start) {
      return basePrice + START_PRICE;
    }

    if (abbonementValue === AbonnementOptionsEnum.Plus) {
      const discount =
        this.abonnementConfig[this.castAbbonementFn(abbonementValue)].discount;

      return basePrice * (1 - discount / 100);
    }

    if (abbonementValue === AbonnementOptionsEnum.Pro) {
      const discount =
        this.abonnementConfig[this.castAbbonementFn(abbonementValue)].discount;

      return basePrice * (1 - discount / 100);
    }

    return -1;
  });
}

class Helpers {
  static castFn = <T>(value: unknown) => value as T;
}
