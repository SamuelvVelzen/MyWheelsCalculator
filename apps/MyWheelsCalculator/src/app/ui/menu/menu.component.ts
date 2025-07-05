import { CommonModule, DOCUMENT } from '@angular/common';
import {
  Component,
  HostListener,
  OnDestroy,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DiscountButtonComponent, LanguageSelectComponent } from '@mwc/ui';
import { TAILWIND_BREAKPOINTS, TranslatePipe } from '@mwc/util';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  imports: [
    CommonModule,
    DiscountButtonComponent,
    LanguageSelectComponent,
    TranslatePipe,
    RouterLink,
  ],
})
export class MenuComponent implements OnDestroy {
  private readonly _router = inject(Router);
  private readonly _document = inject(DOCUMENT);

  openMenu = signal(false);

  constructor() {
    // Effect to handle body overflow when menu state changes
    effect(() => {
      if (this.openMenu()) {
        this._document.body.classList.add('overflow-hidden');
      } else {
        this._document.body.classList.remove('overflow-hidden');
      }
    });
  }

  isRouteActive(route: string) {
    const currentUrl = this._router.url;
    if (route === '/') {
      // Home route is active only when exactly on '/' or '/?...' (with query params)
      return currentUrl === '/' || currentUrl.startsWith('/?');
    }
    return currentUrl.startsWith(route);
  }

  toggleMenu() {
    this.openMenu.update((open) => !open);
  }

  navigateAndCloseMenu(route: string) {
    this._router.navigate([route], { queryParamsHandling: 'merge' });
    this.openMenu.set(false);
  }

  handleNavigation(event: MouseEvent, route: string) {
    // Allow middle click, ctrl+click, cmd+click to open in new tab
    if (event.button === 1 || event.ctrlKey || event.metaKey) {
      // Let browser handle it naturally (new tab)
      this.openMenu.set(false); // Still close menu on mobile
      return;
    }

    // For regular left clicks, prevent default and use programmatic navigation
    event.preventDefault();
    this.navigateAndCloseMenu(route);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    const target = event.target as Window;
    // Close menu when window width is greater than Tailwind sm breakpoint
    if (target.innerWidth > TAILWIND_BREAKPOINTS.md) {
      this.openMenu.set(false);
    }
  }

  ngOnDestroy() {
    // Ensure scrolling is restored when component is destroyed
    this._document.body.style.overflow = '';
  }
}
