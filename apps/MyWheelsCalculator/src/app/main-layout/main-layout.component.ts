import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DiscountButtonComponent } from '@mwc/ui';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
  standalone: true,
  imports: [RouterOutlet, DiscountButtonComponent],
})
export class MainLayoutComponent {}
