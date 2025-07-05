import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  DiscountButtonComponent,
  LanguageSelectComponent,
  ThemeToggleComponent,
} from '@mwc/ui';
import { MenuService } from '../menu/menu.service';

@Component({
  selector: 'app-menu-utilities',
  templateUrl: './menu-utilities.component.html',
  styleUrls: ['./menu-utilities.component.css'],
  imports: [
    DiscountButtonComponent,
    ThemeToggleComponent,
    LanguageSelectComponent,
    NgClass,
  ],
})
export class MenuUtilitiesComponent {
  private readonly _menuService = inject(MenuService);

  isOpen = this._menuService.isOpen;
}
