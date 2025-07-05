import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { ThemeEnum, ThemeHelpers, ThemeType } from '@mwc/util';

@Component({
  selector: 'mwc-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css'],
  imports: [CommonModule],
})
export class BadgeComponent {
  theme = input<keyof typeof ThemeEnum>('Primary');
  themeType = input<keyof typeof ThemeType>('Fill');

  themeClass = computed(() =>
    ThemeHelpers.getThemeClasses(this.theme(), this.themeType())
  );
}
