import { Component, computed, inject } from '@angular/core';
import { ButtonComponent } from '../../button/button/button.component';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'mwc-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.css'],
  imports: [ButtonComponent],
})
export class ThemeToggleComponent {
  private themeService = inject(ThemeService);

  theme = this.themeService.theme;

  buttonText = computed(() => {
    const mode = this.theme() === 'dark' ? 'Light' : 'Dark';

    return `Switch to ${mode}`;
  });

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
