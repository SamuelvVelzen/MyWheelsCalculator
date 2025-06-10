import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonsCardComponent } from '@mwc/ui';
import { BaseValueAccessor, Helpers } from '@mwc/util';
import {
  AbonnementOptions,
  AbonnementOptionsEnum,
} from '../_types/AbonnementOptionsEnum';
import { CalculatorCardComponent } from '../calculator-card/calculator-card.component';

@Component({
  selector: 'mwc-abonnement-select',
  templateUrl: './abonnement-select.component.html',
  styleUrls: ['./abonnement-select.component.css'],
  imports: [FormsModule, RadioButtonsCardComponent, CalculatorCardComponent],
  standalone: true,
})
export class AbonnementSelectComponent extends BaseValueAccessor<AbonnementOptionsEnum> {
  abbonementOptionsEnum = AbonnementOptionsEnum;

  abonnementOptions = [
    AbonnementOptionsEnum.Start,
    AbonnementOptionsEnum.Plus,
    AbonnementOptionsEnum.Pro,
  ];
  castAbbonementFn = Helpers.castFn<AbonnementOptionsEnum>;

  abonnementConfig = AbonnementOptions;
}
