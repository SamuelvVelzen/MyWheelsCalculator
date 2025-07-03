import { Component, input } from '@angular/core';
import { ThemeEnum, ThemeType } from '../../_services/theme.service';
import { IconComponent } from '../../icon/icon/icon.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'mwc-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.css'],
  imports: [ButtonComponent, IconComponent],
})
export class IconButtonComponent {
  icon = input.required<string>();

  themeType = input<keyof typeof ThemeType>('Hover');
  theme = input<keyof typeof ThemeEnum>('Dark');
}
