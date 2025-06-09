import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { BaseInputControls } from '../../_types/BaseInputControls';

@Component({
  selector: 'mwc-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  imports: [FormsModule, NzSliderModule, CommonModule],
  standalone: true,
})
export class SliderComponent extends BaseInputControls<number> {}
