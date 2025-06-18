import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mwcCurrency',
  standalone: true,
})
export class CurrencyPipe implements PipeTransform {
  transform(value: number | string, showDecimals = true): string {
    const val = Number(value);

    if (isNaN(val)) {
      return typeof value === 'string' ? value : value.toString();
    }

    const formatter = new Intl.NumberFormat(navigator.language, {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: showDecimals ? 2 : 0,
      maximumFractionDigits: showDecimals ? 2 : 0,
    });

    return formatter.format(val);
  }
}
