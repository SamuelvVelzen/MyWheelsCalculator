import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseFormInputs } from '../../_types/BaseFormInputs';

@Component({
  selector: 'mwc-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class ToggleButtonComponent extends BaseFormInputs<boolean> {}
