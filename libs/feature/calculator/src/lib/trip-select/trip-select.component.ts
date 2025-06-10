import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonsCardComponent } from '@mwc/ui';
import { BaseValueAccessor, Helpers } from '@mwc/util';
import { TripOptions, TripOptionsEnum } from '../_types/TripOptionsEnum';
import { CalculatorCardComponent } from '../calculator-card/calculator-card.component';

@Component({
  selector: 'mwc-trip-select',
  templateUrl: './trip-select.component.html',
  styleUrls: ['./trip-select.component.css'],
  imports: [RadioButtonsCardComponent, CalculatorCardComponent, FormsModule],
  standalone: true,
})
export class TripSelectComponent extends BaseValueAccessor<TripOptionsEnum> {
  castTripFn = Helpers.castFn<TripOptionsEnum>;

  tripConfig = TripOptions;

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
}
