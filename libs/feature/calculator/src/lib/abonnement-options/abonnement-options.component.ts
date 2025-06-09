import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonsComponent } from '@mwc/ui';
import { BaseValueAccessor } from '@mwc/util';
import { AbonnementOptionsEnum } from '../_types/AbonnementOptionsEnum';

@Component({
  selector: 'mwc-abonnement-options',
  templateUrl: './abonnement-options.component.html',
  styleUrls: ['./abonnement-options.component.css'],
  standalone: true,
  imports: [RadioButtonsComponent, FormsModule],
})
export class AbonnementOptionsComponent extends BaseValueAccessor<AbonnementOptionsEnum> {
  radioButtons = [
    {
      value: AbonnementOptionsEnum.Start,
      title: 'Start',
      label: '0% korting',
      price: 'Gratis',
    },
    {
      value: AbonnementOptionsEnum.Plus,
      title: 'Plus',
      label: '10% korting',
      price: '10 p/maand',
    },
    {
      value: AbonnementOptionsEnum.Pro,
      title: 'Pro',
      label: '25% korting',
      price: '25 p/maand',
    },
  ];
}
