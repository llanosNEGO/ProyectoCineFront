import { NgClass, NgFor } from '@angular/common';
import { Component, importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem {
  title: string;
  route: string;
  isActive: boolean;
}

@Component({
  selector: 'app-administracion-panel',
  standalone: true,
  imports: [RouterModule,NgClass,NgFor],
  templateUrl: './administracion-panel.component.html',
  styleUrl: './administracion-panel.component.css'
})
export class AdministracionPanelComponent {
  currentUser = {
    name: 'ADMIN',
    initials: 'AU',
    role: 'ADMIN'
  };

  // Menú de navegación
  menuItems: MenuItem[] = [
    { title: 'Administrar Película', route: 'movieAdmin', isActive: false },
    { title: 'Administrar Cine', route: 'cinemaAdmin', isActive: false },
    { title: 'Administrar Dulceria', route: 'dulceriaAdmin', isActive: false },
  ];

  setActiveItem(activeItem: MenuItem): void {
    this.menuItems.forEach(item => item.isActive = false);
    activeItem.isActive = true;
  }
}
