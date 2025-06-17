import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Movie } from '../../../models/Movie';

@Injectable({
  providedIn: 'root',
})
export class MovieApiService {
  private baseUrl = 'http://localhost:9090/v1/movies';

  constructor(private http: HttpClient) {}

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}/pelicula`).pipe(
      catchError((error: any) => {
        console.error('Error al obtener películas:', error);
        return throwError(() => new Error('Error al obtener películas'));
      })
    );
  }
  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/pelicula/${id}`).pipe(
      catchError((error: any) => {
        console.error('Error al obtener película', error);
        return throwError(() => new Error('Error al obtener película'));
      })
    );
  }
  createMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.baseUrl}/pelicula`, movie).pipe(
       catchError((error: any) => {
        console.error('Error al crear película', error);
        return throwError(() => new Error('Error al crear película'));
      })
    );
  }
  updateMovie(id: number, movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.baseUrl}/pelicula/${id}`, movie).pipe(
      catchError((error: any) => {
        console.error('Error al actualizar película', error);
        return throwError(() => new Error('Error al actualizar película'));
      })
    );
  }
  deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/pelicula/${id}`).pipe(
      catchError((error: any) => {
        console.error('Error al eliminar película', error);
        return throwError(() => new Error('Error al eliminar película'));
      })
    );
  }

}
