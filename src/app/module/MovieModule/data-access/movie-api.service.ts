import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Movie } from '../../../models/Movie';

@Injectable({
  providedIn: 'root',
})
export class MovieApiService {
  private baseUrl = 'http://localhost:9090/v1/movies';
  private staticToken = 'eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiQURNSU4sREJBIiwidGVzdCI6Im1pdG9jb2RlLXRlc3QtdmFsdWUiLCJzdWIiOiJBZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NTE4MjAzMDksImV4cCI6MTc1MTgzODMwOX0.u4XGbUdr2WqyBbf1ivZJILSztrfrztaAq4WLsJNFErl-WzevTraQZqs2DoGgfv-LQTsXgyJ4YrzRUXmA_QRMUw';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.staticToken.trim()}`,
      'Content-Type': 'application/json'
    });
  }

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}`).pipe(
      catchError((error: any) => {
        console.error('Error al obtener películas:', error);
        return throwError(() => new Error('Error al obtener películas'));
      })
    );
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/${id}`).pipe(
      catchError((error: any) => {
        console.error('Error al obtener película', error);
        return throwError(() => new Error('Error al obtener película'));
      })
    );
  }


createMovie(movie: Movie): Observable<Movie> {
  const headers = this.getHeaders();
  console.log('Token being sent:', headers.get('Authorization')); 
  
  return this.http.post<Movie>(`${this.baseUrl}/`, movie, { headers }).pipe(
    catchError((error: any) => {
      console.error('Full error:', error); 
      if (error.status === 401) {
        console.error('Error 401: Revisa el token o CORS en el backend');
      }
      return throwError(() => new Error('Error al crear película'));
    })
  );
}

  updateMovie(id: number, movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.baseUrl}/${id}`, movie, { headers: this.getHeaders() }).pipe(
      catchError((error: any) => {
        console.error('Error al actualizar película', error);
        return throwError(() => new Error('Error al actualizar película'));
      })
    );
  }

  deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError((error: any) => {
        console.error('Error al eliminar película', error);
        return throwError(() => new Error('Error al eliminar película'));
      })
    );
  }
}