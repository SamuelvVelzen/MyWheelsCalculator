import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonsCardComponent } from '@mwc/ui';
import { BaseValueAccessor, CurrencyPipe, Helpers } from '@mwc/util';
import {
  AbonnementOptions,
  AbonnementOptionsEnum,
} from '../_types/AbonnementOptionsEnum';

@Component({
  selector: 'mwc-abonnement-select',
  templateUrl: './abonnement-select.component.html',
  styleUrls: ['./abonnement-select.component.css'],
  imports: [FormsModule, RadioButtonsCardComponent, CurrencyPipe, CommonModule],
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
