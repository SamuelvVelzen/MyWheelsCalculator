import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  FlatpickrDirective,
  provideFlatpickrDefaults,
} from 'angularx-flatpickr';
import { FlatPickrOutputOptions } from 'angularx-flatpickr/lib/flatpickr.directive';
import { BaseDateInputs } from '../../../_types/BaseDateInputs';

@Component({
  selector: 'mwc-input-datetime',
  templateUrl: './input-datetime.component.html',
  styleUrls: ['./input-datetime.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, FlatpickrDirective],
  providers: [provideFlatpickrDefaults()],
})
export class InputDatetimeComponent extends BaseDateInputs<string> {
  mappedValue = computed(() => {
    if (!this.value) {
      return '';
    }

    return {
      date: new Date(this.value).toISOString().split('T')[0],
      time: new Date(this.value).toISOString().split('T')[1],
    };
  });

  updateValue(event: FlatPickrOutputOptions): void {
    const date = event.selectedDates[0];

    this.value = new Date(date).toISOString();
  }
}
