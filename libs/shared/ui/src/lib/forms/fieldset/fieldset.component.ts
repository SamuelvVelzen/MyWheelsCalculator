import { Component, input } from '@angular/core';

@Component({
  selector: 'mwc-fieldset',
  templateUrl: './fieldset.component.html',
  styleUrls: ['./fieldset.component.css'],
  standalone: true,
})
export class FieldsetComponent {
  labelText = input.required<string>();
}
