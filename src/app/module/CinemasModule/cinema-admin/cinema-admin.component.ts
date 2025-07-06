import { Component } from '@angular/core';
import { CinemaApiService } from '../data-access/cinema-api.service';
import { CommonModule, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { Cine } from '../../../models/Cine';

@Component({
  selector: 'app-cinema-admin',
  standalone: true,
  imports: [NgFor,CommonModule],
  templateUrl: './cinema-admin.component.html',
  styleUrl: './cinema-admin.component.css'
})
export class CinemaAdminComponent {
  cinemas : Cine[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private cinemaService: CinemaApiService,
    private router: Router
  ) {}

   ngOnInit(): void {
    this.loadCinemas();
  }

  loadCinemas(): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    this.cinemaService.getAllCinemas().subscribe({
      next: (data: Cine[]) => {
        this.cinemas = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los cines. Por favor, intente nuevamente.';
        this.isLoading = false;
        console.error('Error loading cinemas:', error);
      }
    });
  }

  deleteCinema(id: number): void {
    if (confirm('¿Está seguro que desea eliminar este cine?')) {
      this.cinemaService.deleteCinema(id).subscribe({
        next: () => {
          this.cinemas = this.cinemas.filter(cinema => cinema.id !== id);
        },
        error: (error) => {
          console.error('Error deleting cinema:', error);
          alert('Error al eliminar el cine');
        }
      });
    }
  }

  onCreate(): void {
    this.router.navigate(['/Admin/cinemaCrear']);
  }
  editCinema(id: number): void {
    this.router.navigate(['/Admin/cinemaEdit', id]);
  }

}
