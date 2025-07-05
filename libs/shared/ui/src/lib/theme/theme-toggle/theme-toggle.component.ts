import { Component, computed, inject } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'mwc-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.css'],
})
export class ThemeToggleComponent {
  private themeService = inject(ThemeService);

  theme = this.themeService.theme;

  buttonText = computed(() => {
    const mode = this.theme() === 'dark' ? 'Light' : 'Dark';

    return `Switch to ${mode} Mode`;
  });

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
