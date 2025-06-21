import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  startDate: string;
  endDate: string;
}> {
  labelText = input<string>('Start date');

  setStartDate(startDate: string): void {
    console.log('setStartDate', startDate);
    if (!this.value) {
      return;
    }

    this.value.startDate = startDate;
  }

  setEndDate(endDate: string): void {
    if (!this.value) {
      return;
    }

    const endDateString = endDate;

    this.value.endDate = endDateString;
  }

  minStartDate = input<string>(new Date().toISOString());
  minEndDate = input<string>(this.minStartDate());
  step = input<number>();
}
