import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency',
})
export class CurrencyPipe implements PipeTransform {
  private _currencyFormatter = new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: 'EUR',
  });

  transform(value: number | string): string {
    console.log(value);
    const val = Number(value);

    if (isNaN(val)) {
      return typeof value === 'string' ? value : value.toString();
    }

    return this._currencyFormatter.format(val);
  }
}
