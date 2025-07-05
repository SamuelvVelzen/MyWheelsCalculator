import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuUtilitiesComponent } from '../ui/menu-utilities/menu-utilities.component';
import { MenuComponent } from '../ui/menu/menu.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, MenuComponent, MenuUtilitiesComponent],
})
export class MainLayoutComponent {}
