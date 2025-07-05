import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from '@mwc/ui';
import { MenuComponent } from '../ui/menu/menu.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, MenuComponent],
})
export class MainLayoutComponent {
  private themeService = inject(ThemeService);

  // Expose service signals for template
  theme = this.themeService.theme;

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
