import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from '@mwc/ui';
import { CurrencyPipe } from '@mwc/util';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
  standalone: true,
  imports: [RouterOutlet, CurrencyPipe, ButtonComponent],
})
export class MainLayoutComponent {}
