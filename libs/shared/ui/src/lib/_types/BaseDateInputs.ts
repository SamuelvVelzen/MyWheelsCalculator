import { Directive, input } from '@angular/core';
import { BaseFormInputs } from './BaseFormInputs';

@Directive()
export class BaseDateInputs<T> extends BaseFormInputs<T> {
  min = input<string>();
  max = input<string>();
  step = input<number>();
}
