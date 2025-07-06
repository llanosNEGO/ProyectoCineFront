import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Movie } from '../../../models/Movie';
import { MovieApiService } from '../data-access/movie-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-admin.component.html',
  styleUrl: './movie-admin.component.css'
})
export class MovieAdminComponent {
  movies: Movie[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private movieApiService: MovieApiService,
    private router : Router
  ){}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    this.movieApiService.getAllMovies().subscribe({
      next: (movies) => {
        this.movies = movies;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar las películas. Por favor, inténtelo de nuevo.';
        this.isLoading = false;
        console.error('Error:', error);
      }
    });
  }
    onCreate(): void {
    this.router.navigate(['/Admin/movieCreate']);
  }

  editMovie(id: number): void {
    this.router.navigate(['/Admin/movieEdit', id]);
  }
  // Función para manejar la eliminación de una película
  deleteMovie(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta película?')) {
      this.movieApiService.deleteMovie(id).subscribe({
        next: () => {
          // Actualizar la lista después de eliminar
          this.loadMovies();
        },
        error: (error) => {
          this.errorMessage = 'Error al eliminar la película.';
          console.error('Error:', error);
        }
      });
    }
  }

}
