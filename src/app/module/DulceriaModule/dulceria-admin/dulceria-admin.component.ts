import { Component, OnInit } from '@angular/core';

import { Dulceria } from '../../../models/Dulceria';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DulceriaApiService } from '../data-access/dulceria-api.service';

@Component({
  selector: 'app-dulceria-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dulceria-admin.component.html',
  styleUrls: ['./dulceria-admin.component.css']
})
export class DulceriaAdminComponent implements OnInit {
  dulceriaItems: Dulceria[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private dulceriaService: DulceriaApiService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.loadDulceriaItems();
  }

  loadDulceriaItems(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.dulceriaService.getAllDulceria().subscribe({
      next: (items) => {
        this.dulceriaItems = items;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los items de dulcería';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  deleteItem(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este item?')) {
      this.dulceriaService.deleteDulceria(Number(id)).subscribe({
        next: () => {
          this.loadDulceriaItems(); // Refresh the list after deletion
        },
        error: (err) => {
          console.error('Error al eliminar el item:', err);
          this.errorMessage = 'Error al eliminar el item';
        }
      });
    }
  }
  editDulceria(id : number): void{
    this.router.navigate(['/Admin/dulceriaEdit', id])
  }
  onCreate(): void {
    this.router.navigate(['/Admin/dulceriaCrear']);
  }

}