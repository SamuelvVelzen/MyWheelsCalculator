import { NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, ElementRef, input, viewChild } from '@angular/core';
import { CurrencyPipe, TranslatePipe } from '@mwc/util';

@Component({
  selector: 'mwc-routes-price-details',
  templateUrl: './routes-price-details.component.html',
  styleUrls: ['./routes-price-details.component.css'],
  imports: [TranslatePipe, CurrencyPipe, NgTemplateOutlet, NgStyle],
})
export class RoutesPriceDetailsComponent {
  priceDetailsSection = viewChild.required<ElementRef>('priceDetailsSection');

  priceDetail = input.required<
    {
      totalPrice: number;
      basePrice: number;
      extraCosts: number;
      kmPrice: number;
      extraKm: number;
      hourPrice: number;
      depositPrice: number;
    }[]
  >();

  scrollToDetails() {
    const element = this.priceDetailsSection();

    element.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }
}
