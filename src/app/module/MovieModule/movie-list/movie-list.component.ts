import { Component } from '@angular/core';
import { Movie } from '../../../models/Movie';
import { MovieApiService } from '../../MovieModule/data-access/movie-api.service';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { MovieCardComponent } from "../../../shared/iu/movie-card/movie-card.component";

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [NgFor, MovieCardComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {
  movies: Movie[] = [];

  constructor(private movieService: MovieApiService, private router: Router) {}

  ngOnInit(): void {
    this.movieService.getAllMovies().subscribe((data: Movie[]) => {
      this.movies = data;
    });
  }

  viewDetails(id: number): void {
    if(id){
      this.router.navigate(['/movie', id])
    }else {
      console.error('Id de pelicula no es valido:',id)
    }
  }

}
