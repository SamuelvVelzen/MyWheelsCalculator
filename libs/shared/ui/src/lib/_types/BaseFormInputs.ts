import { Directive } from '@angular/core';
import { BaseValueAccessor } from '@mwc/util';

@Directive()
export class BaseFormInputs<T> extends BaseValueAccessor<T> {
  private static instanceCounter = 0;
  readonly name: string = `base-form-inputs-${BaseFormInputs.instanceCounter++}`;
}
