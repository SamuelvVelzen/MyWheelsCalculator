import { CommonModule } from '@angular/common';
import { Component, computed, output, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  FlatpickrDirective,
  provideFlatpickrDefaults,
} from 'angularx-flatpickr';
import { FlatPickrOutputOptions } from 'angularx-flatpickr/lib/flatpickr.directive';
import { addHours, setMinutes } from 'date-fns';
import { BaseDateInputs } from '../../../_types/BaseDateInputs';

@Component({
  selector: 'mwc-input-datetime',
  templateUrl: './input-datetime.component.html',
  styleUrls: ['./input-datetime.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, FlatpickrDirective],
  providers: [provideFlatpickrDefaults()],
})
export class InputDatetimeComponent extends BaseDateInputs<Date> {
  calendar = viewChild.required<FlatpickrDirective>(FlatpickrDirective);

  calendarClosed = output<void>();

  minuteIncrement = computed(() => this.step() ?? 1);

  updateValue(event: FlatPickrOutputOptions): void {
    const date = event.selectedDates[0];

    const roundedDate = this._roundToNearestStep(new Date(date));

    this.value = roundedDate;
  }

  private _roundToNearestStep(date: Date): Date {
    const currentMinutes = date.getMinutes();

    const remainder = currentMinutes % this.minuteIncrement();

    const roundedMinutes =
      currentMinutes + (this.minuteIncrement() - remainder);

    // Handle overflow to next hour
    if (roundedMinutes >= 60) {
      date = addHours(date, 1);
      return setMinutes(date, 0);
    }

    return setMinutes(date, roundedMinutes);
  }
}
