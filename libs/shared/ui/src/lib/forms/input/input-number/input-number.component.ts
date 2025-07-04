import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseInputControls } from '../../../_types/BaseInputControls';

@Component({
  selector: 'mwc-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.css'],
  imports: [FormsModule],
  standalone: true,
})
export class InputNumberComponent extends BaseInputControls<number> {}
