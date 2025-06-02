import { CommonModule } from '@angular/common';
import { Component, TemplateRef, contentChild, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseValueAccessor } from '@mwc/util';
import { NzRadioModule } from 'ng-zorro-antd/radio';

@Component({
  imports: [FormsModule, NzRadioModule, CommonModule],
  selector: 'mwc-radio-buttons',
  templateUrl: './radio-buttons.component.html',
  styleUrl: './radio-buttons.component.css',
})
export class RadioButtonsComponent<T> extends BaseValueAccessor<T> {
  radioButtonContent = contentChild.required('radioButtonContent', {
    read: TemplateRef<{ $implicit: { value: T; label: string } }>,
  });
  radioButtons = input.required<Array<{ value: T; label: string }>>();
}
