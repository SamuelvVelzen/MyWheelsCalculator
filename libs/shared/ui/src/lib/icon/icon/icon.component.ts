import { Component, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'mwc-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css'],
  imports: [NgIcon],
})
export class IconComponent {
  icon = input.required<string>();
}
