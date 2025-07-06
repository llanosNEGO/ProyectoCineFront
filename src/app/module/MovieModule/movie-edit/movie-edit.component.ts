import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieApiService } from '../data-access/movie-api.service';
import { Movie } from '../../../models/Movie';

@Component({
  selector: 'app-movie-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
  movieForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string | null = null;
  isSuccess: boolean = false;

  // Opciones para selects
  languages: string[] = ['Español', 'Inglés', 'Subtitulada'];
  statusOptions: string[] = ['Estreno', 'Próximo', 'Cartelera'];
  ageRatings: string[] = ['A', 'B', 'B15', 'C', 'D'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private movieApiService: MovieApiService
  ) {
    this.movieForm = this.fb.group({
      idMovie: [0],
      title: ['', [Validators.required, Validators.maxLength(100)]],
      url: ['', [Validators.required, Validators.pattern('https?://.+')]],
      idioma: [[], Validators.required],
      sinopsis: ['', [Validators.required, Validators.maxLength(500)]],
      genre: ['', Validators.required],
      status: [[], Validators.required],
      director: ['', [Validators.required, Validators.maxLength(50)]],
      durationMovie: ['', [Validators.required]],
      age: ['', Validators.required],
      urlTrailer: [''],
      idCinemas: [[]],
      disponible: [[]],
      id: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadMovie(+id);
    }
  }

  loadMovie(id: number): void {
    this.isLoading = true;
    this.movieApiService.getMovieById(id).subscribe({
      next: (movie) => {
        this.movieForm.patchValue({
          ...movie,
          // Asegurar que los arrays no sean null
          idioma: movie.idioma || [],
          status: movie.status || [],
          idCinemas: movie.idCinemas || [],
          disponible: movie.disponible || []
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar la película';
        this.isLoading = false;
        console.error('Error:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.movieForm.invalid) {
      this.movieForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    this.isSuccess = false;

    const movieData: Movie = this.movieForm.value;

    this.movieApiService.updateMovie(movieData.idMovie, movieData).subscribe({
      next: () => {
        this.isSuccess = true;
        this.isLoading = false;
        setTimeout(() => this.router.navigate(['/Admin/movieAdmin']), 2000);
      },
      error: (error) => {
        this.errorMessage = 'Error al actualizar la película';
        this.isLoading = false;
        console.error('Error:', error);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/Admin/movieAdmin']);
  }

  // Métodos para manejar selecciones múltiples
  toggleSelection(item: string, controlName: string): void {
    const control = this.movieForm.get(controlName);
    if (control) {
      const currentValue: string[] = control.value || [];
      const index = currentValue.indexOf(item);
      
      if (index === -1) {
        control.setValue([...currentValue, item]);
      } else {
        control.setValue(currentValue.filter(i => i !== item));
      }
    }
  }

  isSelected(item: string, controlName: string): boolean {
    const control = this.movieForm.get(controlName);
    return control?.value?.includes(item) || false;
  }

  // Helper para acceder fácil a los controles en el template
  get f() {
    return this.movieForm.controls;
  }
}