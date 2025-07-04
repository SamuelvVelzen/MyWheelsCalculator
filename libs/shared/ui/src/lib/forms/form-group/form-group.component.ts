import { Component, HostBinding, input } from '@angular/core';
import { BadgeComponent } from '../../badge/badge.component';

@Component({
  selector: 'mwc-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.css'],
  imports: [BadgeComponent],
})
export class FormGroupComponent {
  @HostBinding('class.form-group') formGroupClass = true;

  labelText = input.required<string>();

  badgeLabel = input<string>();
}
