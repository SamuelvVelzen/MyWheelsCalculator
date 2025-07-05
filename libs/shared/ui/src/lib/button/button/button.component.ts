import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { ThemeEnum, ThemeHelpers, ThemeType } from '@mwc/util';

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
    ThemeHelpers.getThemeClasses(this.theme(), this.themeType())
  );
}
