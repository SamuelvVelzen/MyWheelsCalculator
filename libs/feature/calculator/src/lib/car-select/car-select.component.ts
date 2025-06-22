import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonsCardComponent } from '@mwc/ui';
import {
  BaseValueAccessor,
  CurrencyPipe,
  Helpers,
  TranslatePipe,
} from '@mwc/util';
import { AbonnementOptionsEnum } from '../_types/AbonnementOptionsEnum';
import { AutoOptions, AutoOptionsEnum } from '../_types/AutoOptionsEnum';

@Component({
  selector: 'mwc-car-select',
  templateUrl: './car-select.component.html',
  styleUrls: ['./car-select.component.css'],
  imports: [
    FormsModule,
    RadioButtonsCardComponent,
    CurrencyPipe,
    CommonModule,
    TranslatePipe,
  ],
  standalone: true,
})
export class CarSelectComponent extends BaseValueAccessor<AutoOptionsEnum> {
  castCarFn = Helpers.castFn<AutoOptionsEnum>;

  abonnement = input.required<AbonnementOptionsEnum>();

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
            AutoOptions[this.abonnement()][AutoOptionsEnum.Compact].kmPrice,
          hourPrice:
            AutoOptions[this.abonnement()][AutoOptionsEnum.Compact].hourPrice,
        },
        [AutoOptionsEnum.Comfort]: {
          title: 'Comfort',
          kmPrice:
            AutoOptions[this.abonnement()][AutoOptionsEnum.Comfort].kmPrice,
          hourPrice:
            AutoOptions[this.abonnement()][AutoOptionsEnum.Comfort].hourPrice,
        },
        [AutoOptionsEnum.Extra]: {
          title: 'Extra',
          kmPrice:
            AutoOptions[this.abonnement()][AutoOptionsEnum.Extra].kmPrice,
          hourPrice:
            AutoOptions[this.abonnement()][AutoOptionsEnum.Extra].hourPrice,
        },
        [AutoOptionsEnum.Premium]: {
          title: 'Premium',
          kmPrice:
            AutoOptions[this.abonnement()][AutoOptionsEnum.Premium].kmPrice,
          hourPrice:
            AutoOptions[this.abonnement()][AutoOptionsEnum.Premium].hourPrice,
        },
      };
    }
  );
}
