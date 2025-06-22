import { Component } from '@angular/core';
import { CurrencyPipe, TranslatePipe } from '@mwc/util';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'mwc-discount-button',
  templateUrl: './discount-button.component.html',
  styleUrls: ['./discount-button.component.css'],
  standalone: true,
  imports: [ButtonComponent, CurrencyPipe, TranslatePipe],
})
export class DiscountButtonComponent {
  shareLink = 'https://mywheels.nl/uitnodigen/samuel9178';
}
