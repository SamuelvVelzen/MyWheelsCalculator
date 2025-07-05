import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { StorageService, WINDOW } from '@mwc/util';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'theme-preference';

  private readonly storageService = inject(StorageService);
  private readonly _document = inject(DOCUMENT);
  private readonly _window = inject(WINDOW);

  // Signals for reactive state
  private readonly themeSignal = signal<ThemeMode>('light');

  // Public computed signals
  readonly theme = this.themeSignal.asReadonly();

  constructor() {
    this.initializeTheme();
  }

  /**
   * Set the theme mode
   * @param mode - The theme mode to set
   */
  setTheme(mode: ThemeMode): void {
    this.themeSignal.set(mode);

    this.storageService.setItem(this.THEME_KEY, mode);
    this.applyTheme(mode);
  }

  /**
   * Toggle between light and dark mode
   */
  toggleTheme(): void {
    const newMode = this.themeSignal() === 'dark' ? 'light' : 'dark';
    this.setTheme(newMode);
  }

  private initializeTheme(): void {
    // Try to get saved preference, fall back to system preference
    const savedTheme = this.storageService.getItem(this.THEME_KEY) as ThemeMode;
    const theme = savedTheme || this.getSystemPreference();

    this.themeSignal.set(theme);
    this.applyTheme(theme);
  }

  private applyTheme(mode: ThemeMode): void {
    const htmlElement = this._document.documentElement;

    // Remove existing color-scheme classes
    htmlElement.classList.remove(
      'scheme-light',
      'scheme-dark',
      'scheme-light-dark'
    );

    switch (mode) {
      case 'dark':
        htmlElement.classList.add('scheme-dark');
        break;
      case 'light':
        htmlElement.classList.add('scheme-light');
        break;
    }
  }

  private getSystemPreference(): 'light' | 'dark' {
    return this._window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
}
