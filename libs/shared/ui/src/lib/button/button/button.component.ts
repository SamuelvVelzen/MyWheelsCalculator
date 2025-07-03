import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import {
  ThemeEnum,
  ThemeService,
  ThemeType,
} from '../../_services/theme.service';

@Component({
  selector: 'mwc-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  imports: [CommonModule],
})
export class ButtonComponent {
  type = input<HTMLButtonElement['type']>('button');
  buttonClasses = input<string>('');

  themeType = input<keyof typeof ThemeType>('Fill');
  theme = input<keyof typeof ThemeEnum>('Primary');

  themeClasses = computed(() =>
    ThemeService.getThemeClasses(this.theme(), this.themeType())
  );
}
