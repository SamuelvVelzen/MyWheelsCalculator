import { Component } from '@angular/core';
import { CalculatorComponent } from '@mwc/calculator';

@Component({
  imports: [CalculatorComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
