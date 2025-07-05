import { Component, input, output } from '@angular/core';
import { ButtonComponent } from '@mwc/ui';
import { CurrencyPipe, TranslatePipe } from '@mwc/util';

@Component({
  selector: 'mwc-price-total',
  templateUrl: './price-total.component.html',
  styleUrls: ['./price-total.component.css'],
  imports: [ButtonComponent, TranslatePipe, CurrencyPipe],
})
export class PriceTotalComponent {
  totalPrice = input.required<number>();

  showDetailsClicked = output<void>();
}
