import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Cinemas } from '../../../models/Cinemas';

@Injectable({
  providedIn: 'root'
})
export class CinemaApiService {
  private apiUrl = 'http://localhost:9090/v1/cines';

  constructor(private http: HttpClient) {}

  // Obtener todos los cines
  getAllCinemas(): Observable<Cinemas[]> {
    return this.http.get<Cinemas[]>(`${this.apiUrl}/cinemas`).pipe(
      catchError((error: any) => {
        console.error('Error al obtener cines:', error);
        return throwError(() => new Error('Error al obtener cines'));
      })
    );
  }

  // Obtener un cine por ID
  getCinemaById(id: number): Observable<Cinemas> {
    return this.http.get<Cinemas>(`${this.apiUrl}/cinema/${id}`).pipe(
      catchError((error: any) => {
        console.error(`Error al obtener cine con ID ${id}:`, error);
        return throwError(() => new Error(`Error al obtener cine con ID ${id}`));
      })
    );
  }

  // Crear nuevo cine
  createCinema(cinema: Cinemas): Observable<Cinemas> {
    return this.http.post<Cinemas>(`${this.apiUrl}/cinema`, cinema).pipe(
      catchError((error: any) => {
        console.error('Error al crear cine:', error);
        return throwError(() => new Error('Error al crear cine'));
      })
    );
  }

  // Actualizar cine existente
  updateCinema(id: number, cinema: Cinemas): Observable<Cinemas> {
    return this.http.put<Cinemas>(`${this.apiUrl}/cinema/${id}`, cinema).pipe(
      catchError((error: any) => {
        console.error(`Error al actualizar cine con ID ${id}:`, error);
        return throwError(() => new Error(`Error al actualizar cine con ID ${id}`));
      })
    );
  }

  // Eliminar cine
  deleteCinema(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cinema/${id}`).pipe(
      catchError((error: any) => {
        console.error(`Error al eliminar cine con ID ${id}:`, error);
        return throwError(() => new Error(`Error al eliminar cine con ID ${id}`));
      })
    );
  }
}