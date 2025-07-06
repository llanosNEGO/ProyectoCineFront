import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { MovieApiService } from '../data-access/movie-api.service';
import { Movie } from '../../../models/Movie';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  standalone: true,
  imports:[ReactiveFormsModule, NgIf],
  styleUrls: ['./movie-create.component.css']
})
export class MovieCreateComponent implements OnInit {
  movieForm: FormGroup;
  message: string = '';
  isError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private movieService: MovieApiService,
    private router: Router
  ) {
    this.movieForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      url: ['', [Validators.required, Validators.pattern('https?://.+')]],
      idioma: [[]],
      sinopsis: ['', [Validators.required, Validators.minLength(10)]],
      genre: ['', Validators.required],
      status: [[]],
      director: ['', [Validators.required, Validators.minLength(1)]],
      durationMovie: ['', [Validators.required]],
      age: [''],
      urlTrailer: ['', [Validators.pattern('https?://.+')]],
      idCinemas: [[]],
      disponible: [[]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
  if (this.movieForm.invalid) {
    this.markAllAsTouched();
    this.message = 'Por favor, complete todos los campos requeridos correctamente.';
    this.isError = true;
    return;
  }


  const movieData: Movie = {
    ...this.movieForm.value

  };

  this.movieService.createMovie(movieData).subscribe({
    next: (response) => {
      this.message = 'Película creada con éxito!';
      this.isError = false;
      setTimeout(() => {
        this.router.navigate(['/movieCrear']);
      }, 2000);
    },
    error: (err) => {
      this.message = 'Error al crear la película: ' + (err.error?.message || err.message);
      this.isError = true;
      console.error('Error completo:', err);
    }
  });
}

  onCancel(): void {
    this.router.navigate(['/Admin/movieAdmin']);
  }

  
  private markAllAsTouched(): void {
    Object.values(this.movieForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  get title() { return this.movieForm.get('title'); }
  get url() { return this.movieForm.get('url'); }
  get sinopsis() { return this.movieForm.get('sinopsis'); }
  get genre() { return this.movieForm.get('genre'); }
  get director() { return this.movieForm.get('director'); }
  get durationMovie() { return this.movieForm.get('durationMovie'); }
  get urlTrailer() { return this.movieForm.get('urlTrailer'); }
}