import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Cine } from '../../../models/Cine';
import { AuthUserService } from '../../AuthModule/data-access/auth-user.service';

@Injectable({
  providedIn: 'root'
})
export class CinemaApiService {
  private apiUrl = 'http://localhost:9090/v1/cinemas';

  constructor(
    private http: HttpClient,
    private authService: AuthUserService
  ) {}

  private getAuthHeaders(): HttpHeaders | null {
    if (!this.authService.isAuthenticated || !this.authService.currentUser?.token) {
      return null;
    }
    
    const cleanToken = this.authService.currentUser.token.trim().replace(/\s+/g, '');
    return new HttpHeaders({
      'Authorization': `Bearer ${cleanToken}`,
      'Content-Type': 'application/json'
    });
  }

  // Obtener todos los cines (sin token)
  getAllCinemas(): Observable<Cine[]> {
    return this.http.get<Cine[]>(`${this.apiUrl}`).pipe(
      catchError((error: any) => {
        console.error('Error al obtener cines:', error);
        return throwError(() => new Error('Error al obtener cines'));
      })
    );
  }

  // Obtener un cine por ID (sin token)
  getCinemaById(id: number): Observable<Cine> {
    return this.http.get<Cine>(`${this.apiUrl}/${id}`).pipe(
      catchError((error: any) => {
        console.error(`Error al obtener cine con ID ${id}:`, error);
        return throwError(() => new Error(`Error al obtener cine con ID ${id}`));
      })
    );
  }

  // Crear nuevo cine (con token)
  createCinema(cinema: Cine): Observable<Cine> {
    const headers = this.getAuthHeaders();
    if (!headers) {
      return throwError(() => new Error('Usuario no autenticado'));
    }
    
    console.log('Headers being sent:', headers); // Debug
    
    return this.http.post<Cine>(`${this.apiUrl}`, cinema, { headers }).pipe(
      catchError((error: any) => {
        console.error('Full error response:', error);
        return throwError(() => new Error('Error al crear cine'));
      })
    );
  }

  // Actualizar cine existente (con token)
  updateCinema(id: number, cinema: Cine): Observable<Cine> {
    const headers = this.getAuthHeaders();
    if (!headers) {
      return throwError(() => new Error('Usuario no autenticado'));
    }
    
    return this.http.put<Cine>(`${this.apiUrl}/${id}`, cinema, { headers }).pipe(
      catchError((error: any) => {
        console.error(`Error al actualizar cine con ID ${id}:`, error);
        return throwError(() => new Error(`Error al actualizar cine con ID ${id}`));
      })
    );
  }

  // Eliminar cine (con token)
  deleteCinema(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    if (!headers) {
      return throwError(() => new Error('Usuario no autenticado'));
    }
    
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError((error: any) => {
        console.error(`Error al eliminar cine con ID ${id}:`, error);
        return throwError(() => new Error(`Error al eliminar cine con ID ${id}`));
      })
    );
  }
}