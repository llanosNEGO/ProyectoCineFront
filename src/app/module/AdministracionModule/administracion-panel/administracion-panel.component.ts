import { NgClass, NgFor } from '@angular/common';
import { Component, importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem {
  title: string;
  route: string;  // Solo el segmento de la ruta (sin 'administracion/')
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

  // Menú de navegación (solo los segmentos finales de la ruta)
  menuItems: MenuItem[] = [
    { title: 'Crear Película', route: 'movieCrear', isActive: false },
    { title: 'Crear Cine', route: 'cinemaCrear', isActive: false },
    { title: 'Crear Sala', route: 'salaCrear', isActive: false },
    { title: 'Crear Función', route: 'funcionCrear', isActive: false },
    { title: 'Usuarios', route: 'userList', isActive: false }
  ];

  setActiveItem(activeItem: MenuItem): void {
    this.menuItems.forEach(item => item.isActive = false);
    activeItem.isActive = true;
  }
}
