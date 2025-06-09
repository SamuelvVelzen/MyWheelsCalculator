import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseInputControls } from '../../_types/BaseInputControls';

@Component({
  selector: 'mwc-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class SliderComponent extends BaseInputControls<number> {}
