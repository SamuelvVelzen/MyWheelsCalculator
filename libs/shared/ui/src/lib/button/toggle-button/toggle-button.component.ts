import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseFormInputs } from '../../_types/BaseFormInputs';

@Component({
  selector: 'mwc-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.css'],
  standalone: true,
  imports: [FormsModule, NgClass],
})
export class ToggleButtonComponent extends BaseFormInputs<boolean> {
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.value = !this.value;
    }
  }
}
