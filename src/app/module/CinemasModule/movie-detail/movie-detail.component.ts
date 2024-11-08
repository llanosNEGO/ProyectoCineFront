import { Component } from '@angular/core';
import { Movie } from '../../../models/Movie';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieApiService } from '../data-access/movie-api.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent {
  movie?: Movie;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private movieService: MovieApiService
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.movieService.getMovieById(movieId).subscribe((data: Movie) => {
        this.movie = data;
      });
    }
  }

  // Navigate to ReservationComponent with movie data
  goToReservation(): void {
    if (this.movie) {
      this.router.navigate(['/reservation'], { state: { movie: this.movie } });
    }
  }
}
