import { CommonModule } from '@angular/common';
import { Component, input, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateHelpers } from '@mwc/util';
import { BaseFormInputs } from '../../../_types/BaseFormInputs';
import { FormGroupComponent } from '../../form-group/form-group.component';
import { InputDatetimeComponent } from '../input-datetime/input-datetime.component';

@Component({
  selector: 'mwc-input-daterange',
  templateUrl: './input-daterange.component.html',
  styleUrls: ['./input-daterange.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    InputDatetimeComponent,
    FormGroupComponent,
  ],
})
export class InputDaterangeComponent extends BaseFormInputs<{
  startDate: Date | null;
  endDate: Date | null;
}> {
  endDateInput = viewChild.required<InputDatetimeComponent>('endDateInput');

  labelText = input.required<string>();
  badgeLabel = input<string>();

  setStartDate(startDate: Date): void {
    if (!this.value) {
      return;
    }

    const endDate = DateHelpers.isAfter(startDate, this.value.endDate)
      ? null
      : this.value.endDate;

    this.value = {
      startDate,
      endDate,
    };
  }

  setEndDate(endDate: Date): void {
    if (!this.value) {
      return;
    }

    if (
      this.value.startDate &&
      DateHelpers.isBefore(endDate, this.value.startDate)
    ) {
      return;
    }

    this.value = {
      startDate: this.value.startDate,
      endDate,
    };
  }

  minStartDate = input<string>();
  minEndDate = input<string>();
  step = input<number>();

  handleStartDateCalendarClosed(): void {
    if (!this.value?.endDate) {
      setTimeout(() => {
        this.endDateInput().calendar().instance.open();
      }, 100);
    }
  }
}
