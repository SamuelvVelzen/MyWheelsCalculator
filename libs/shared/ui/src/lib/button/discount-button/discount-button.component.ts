import { Component } from '@angular/core';
import { CurrencyPipe } from '@mwc/util';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'mwc-discount-button',
  templateUrl: './discount-button.component.html',
  styleUrls: ['./discount-button.component.css'],
  standalone: true,
  imports: [ButtonComponent, CurrencyPipe],
})
export class DiscountButtonComponent {}
