import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, input, TemplateRef } from '@angular/core';
import { BaseFormInputs } from '../../_types/BaseFormInputs';

@Component({
  selector: 'mwc-radio-buttons-card',
  templateUrl: './radio-buttons-card.component.html',
  styleUrls: ['./radio-buttons-card.component.css'],
  standalone: true,
  imports: [CommonModule, NgTemplateOutlet],
})
export class RadioButtonsCardComponent<T> extends BaseFormInputs<T> {
  options = input.required<T[]>();
  labelText = input.required<string>();

  cardContent = contentChild.required('cardContent', {
    read: TemplateRef<{ $implicit: { value: T; label: string } }>,
  });
}
