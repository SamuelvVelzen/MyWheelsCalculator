import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@mwc/util';
import { PriceService } from '../_services/price.service';

@Component({
  selector: 'mwc-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css'],
  standalone: true,
  imports: [CurrencyPipe],
})
export class PriceComponent {
  priceService = inject(PriceService);

  totalPrice = this.priceService.totalPrice;
}
