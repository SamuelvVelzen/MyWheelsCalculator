import { Component, input, output, viewChild } from '@angular/core';
import { ButtonComponent, TooltipDirective } from '@mwc/ui';
import { CurrencyPipe, TranslatePipe } from '@mwc/util';

@Component({
  selector: 'mwc-price-total',
  templateUrl: './price-total.component.html',
  styleUrls: ['./price-total.component.css'],
  imports: [ButtonComponent, TranslatePipe, CurrencyPipe, TooltipDirective],
})
export class PriceTotalComponent {
  totalPrice = input.required<number>();

  showDetailsClicked = output<void>();

  // Reference to the native tooltip directive
  tooltip = viewChild(TooltipDirective);

  async saveLink(): Promise<void> {
    try {
      const link = window.location.href;
      await navigator.clipboard.writeText(link);

      // Show success tooltip using the native directive
      this.tooltip()?.showTemporary(2000);
    } catch (error) {
      console.error('Failed to copy link to clipboard:', error);
    }
  }
}
