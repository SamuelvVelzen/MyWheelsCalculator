import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { tablerMoon, tablerSun } from '@ng-icons/tabler-icons';
import { IconComponent } from '../../icon/icon/icon.component';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'mwc-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.css'],
  imports: [IconComponent, CommonModule],
})
export class ThemeToggleComponent {
  private themeService = inject(ThemeService);

  theme = this.themeService.theme;

  tablerSun = tablerSun;
  tablerMoon = tablerMoon;

  icon = computed(() =>
    this.theme() === 'dark' ? this.tablerSun : this.tablerMoon
  );

  themeClasses = computed(() => {
    return this.theme() === 'dark'
      ? 'bg-dark text-light hover:bg-warning hover:text-light'
      : 'bg-light text-dark hover:bg-dark hover:text-light';
  });

  buttonText = computed(() => {
    const mode = this.theme() === 'dark' ? 'Light' : 'Dark';

    return `Switch to ${mode}`;
  });

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
