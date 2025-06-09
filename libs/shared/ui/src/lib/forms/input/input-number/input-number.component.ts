import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { BaseInputControls } from '../../../_types/BaseInputControls';

@Component({
  selector: 'mwc-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.css'],
  imports: [FormsModule, NzInputNumberModule],
  standalone: true,
})
export class InputNumberComponent extends BaseInputControls<number> {}
