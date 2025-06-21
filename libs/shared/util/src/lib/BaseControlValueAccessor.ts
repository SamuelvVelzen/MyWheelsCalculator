import { Directive, Optional, output, Self, signal } from '@angular/core';
import { ControlValueAccessor, NgControl, NgModel } from '@angular/forms';

@Directive()
export class BaseValueAccessor<T> implements ControlValueAccessor {
  private _isFirstTime = true;

  disabled = false;

  valueSignal = signal<T | undefined | null>(undefined, {
    equal: (a, b) => {
      return JSON.stringify(a) === JSON.stringify(b);
    },
  });

  readonly selected = output<T | null>();

  private _onChange: (val: T | undefined | null) => void = () => void 0;
  private _onTouched: () => void = () => void 0;

  get value(): T | undefined | null {
    return this.valueSignal();
  }

  set value(val: T | undefined | null) {
    if (this.valueSignal() === val) return;

    this.valueSignal.set(val);
    this._onChange(val);
    this._onTouched();
    this.selected.emit(val || null);
  }

  constructor(@Optional() @Self() private _control?: NgControl) {
    this._setValueAccessor(_control);
  }

  writeValue(val?: T): void {
    if (this._skipWrite(val)) return;
    this.valueSignal.set(val);
  }

  registerOnChange(fn: (val?: T | null) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  triggerTouch(): void {
    this._onTouched();
  }

  private _setValueAccessor(control?: NgControl): void {
    if (control) {
      control.valueAccessor = this;
    }
  }

  /**
   * NgModel has a long-running bug, where the first value
   * is null. If this is the case, we skip the first value, so the
   * value will always be T or undefined
   *
   * The Angular Issue: https://github.com/angular/angular/issues/14988
   */
  private _skipWrite(val: T | undefined): boolean {
    if (!this._isFirstTime) return false;
    this._isFirstTime = false;

    return val === null && this._control instanceof NgModel;
  }
}
