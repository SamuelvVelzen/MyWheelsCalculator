import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseValueAccessor } from '@mwc/util';
import { InputNumberComponent } from '../input/input-number/input-number.component';
import { SliderComponent } from '../slider/slider.component';

@Component({
  selector: 'mwc-slider-number',
  templateUrl: './slider-number.component.html',
  styleUrls: ['./slider-number.component.css'],
  imports: [FormsModule, SliderComponent, InputNumberComponent],
  standalone: true,
})
export class SliderNumberComponent extends BaseValueAccessor<number> {}
