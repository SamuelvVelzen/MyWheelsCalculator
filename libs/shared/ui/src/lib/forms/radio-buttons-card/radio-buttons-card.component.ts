import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, input, TemplateRef } from '@angular/core';
import { BaseFormInputs } from '../../_types/BaseFormInputs';
import { FormGroupComponent } from '../form-group/form-group.component';

@Component({
  selector: 'mwc-radio-buttons-card',
  templateUrl: './radio-buttons-card.component.html',
  styleUrls: ['./radio-buttons-card.component.css'],
  standalone: true,
  imports: [CommonModule, NgTemplateOutlet, FormGroupComponent],
})
export class RadioButtonsCardComponent<T> extends BaseFormInputs<T> {
  options = input.required<T[]>();
  labelText = input.required<string>();

  colClass = input<string>('grid-cols-2');

  cardContent = contentChild.required('cardContent', {
    read: TemplateRef<{ $implicit: { value: T; selected: boolean } }>,
  });

  onKeyDown(event: KeyboardEvent, option: T) {
    if (event.key === 'Enter') {
      event.preventDefault();

      this.value = option;
    }
  }
}
