import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseInputControls } from '../../_types/BaseInputControls';
import { FormGroupComponent } from '../form-group/form-group.component';
import { InputNumberComponent } from '../input/input-number/input-number.component';
import { SliderComponent } from '../slider/slider.component';

@Component({
  selector: 'mwc-slider-number',
  templateUrl: './slider-number.component.html',
  styleUrls: ['./slider-number.component.css'],
  imports: [
    FormsModule,
    SliderComponent,
    InputNumberComponent,
    FormGroupComponent,
  ],
  standalone: true,
})
export class SliderNumberComponent extends BaseInputControls<number> {
  labelText = input.required<string>();
}
