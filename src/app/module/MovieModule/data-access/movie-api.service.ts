import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Movie } from '../../../models/Movie';

@Injectable({
  providedIn: 'root',
})
export class MovieApiService {
  private apiUrl = 'https://66e36081494df9a478e50f0a.mockapi.io/api/cine/Movie';

  constructor(private http: HttpClient) {}

  //Obtenemos toda la data de las movies 
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching movies:', error);
        return throwError(error);
      })
    );
  }

  getMovieById(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching movie details:', error);
        return throwError(error);
      })
    );
  }

  /********************************************* ***********************/
  private apiUrl2 = 'http://127.0.0.1:8080/v1/movies/pelicula';


  getMoviesbac(): Observable<any> {
    return this.http.get<any>(this.apiUrl2).pipe(
      catchError((error) => {
        console.error('Error fetching movies:', error);
        return throwError(error);
      })
    );
  }

}
