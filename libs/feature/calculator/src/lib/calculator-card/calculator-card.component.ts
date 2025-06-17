import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@mwc/util';

@Component({
  selector: 'mwc-calculator-card',
  templateUrl: './calculator-card.component.html',
  styleUrls: ['./calculator-card.component.css'],
  imports: [CurrencyPipe],
  standalone: true,
})
export class CalculatorCardComponent {
  title = input.required<string>();
  price = input.required<string | number>();
  contextText = input<string>();
}
