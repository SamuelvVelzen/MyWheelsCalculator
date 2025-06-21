import { CommonModule } from '@angular/common';
import { Component, computed, output, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateHelpers } from '@mwc/util';
import {
  FlatpickrDirective,
  provideFlatpickrDefaults,
} from 'angularx-flatpickr';
import { FlatPickrOutputOptions } from 'angularx-flatpickr/lib/flatpickr.directive';
import { addDays, setMinutes } from 'date-fns';
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

    const roundedDate = DateHelpers.roundToNearestStep(
      date,
      this.minuteIncrement()
    );

    const rollOverDate = this._addDayOnRollOver(roundedDate);

    this.value = rollOverDate;
  }

  /**
   * This is necesssary because flatpickr does not handle rollover correctly and goes from 23:59 to 00:00 on the same day
   */
  private _addDayOnRollOver(date: Date): Date {
    if (this.value && DateHelpers.isSameDay(this.value, date)) {
      const originalHour = this.value.getHours();
      const newHour = date.getHours();

      if (originalHour >= 23 && newHour <= 0) {
        const newDate = addDays(date, 1);

        return setMinutes(newDate, 0);
      }
    }

    return date;
  }
}
