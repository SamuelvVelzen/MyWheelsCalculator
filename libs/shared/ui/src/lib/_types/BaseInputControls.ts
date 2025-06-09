import { Directive, input } from '@angular/core';
import { BaseFormInputs } from './BaseFormInputs';

@Directive()
export class BaseInputControls<T> extends BaseFormInputs<T> {
  min = input<number | null>(null);
  max = input<number | null>(null);
}
