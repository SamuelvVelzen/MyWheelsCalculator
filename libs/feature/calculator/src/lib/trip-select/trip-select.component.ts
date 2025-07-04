import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonsCardComponent } from '@mwc/ui';
import { BaseValueAccessor, CurrencyPipe, Helpers } from '@mwc/util';
import { TripOptions, TripOptionsEnum } from '../_types/TripOptionsEnum';

@Component({
  selector: 'mwc-trip-select',
  templateUrl: './trip-select.component.html',
  styleUrls: ['./trip-select.component.css'],
  imports: [RadioButtonsCardComponent, FormsModule, CurrencyPipe, CommonModule],
  standalone: true,
})
export class TripSelectComponent extends BaseValueAccessor<TripOptionsEnum> {
  badgeLabel = computed(() => {
    if (!this.value || this.value === TripOptionsEnum.None) {
      return '0 km';
    }

    return this.tripConfig[this.castTripFn(this.value)].title;
  });

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
