import { CommonModule } from '@angular/common';
import { Component, computed, output, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateHelpers } from '@mwc/util';
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

    this.value = roundedDate;
  }
}
