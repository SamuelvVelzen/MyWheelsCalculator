import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DiscountButtonComponent, LanguageSelectComponent } from '@mwc/ui';
import { TranslatePipe } from '@mwc/util';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
  standalone: true,
  imports: [
    RouterOutlet,
    DiscountButtonComponent,
    LanguageSelectComponent,
    TranslatePipe,
  ],
})
export class MainLayoutComponent {}
