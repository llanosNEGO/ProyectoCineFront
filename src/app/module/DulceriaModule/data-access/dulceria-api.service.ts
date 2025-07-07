import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Dulceria } from '../../../models/Dulceria';
import { AuthUserService } from '../../AuthModule/data-access/auth-user.service';

@Injectable({
  providedIn: 'root'
})
export class DulceriaApiService {
  public apiUrl = 'http://localhost:9090/v1/dulceria';

  constructor(
    private http: HttpClient,
    private authService: AuthUserService
  ) {}

  private getAuthHeaders(): HttpHeaders | null {
    // Verifica si el usuario está autenticado y tiene token
    if (!this.authService.isAuthenticated || !this.authService.currentUser?.token) {
      return null;
    }
    
    // Limpia el token de espacios y caracteres especiales
    const cleanToken = this.authService.currentUser.token.trim().replace(/\s+/g, '');
    return new HttpHeaders({
      'Authorization': `Bearer ${cleanToken}`,
      'Content-Type': 'application/json'
    });
  }

  // GET methods without auth token
  getAllDulceria(): Observable<Dulceria[]> {
    return this.http.get<Dulceria[]>(`${this.apiUrl}`).pipe(
      catchError((error: any) => {
        console.error('Error al obtener dulcería:', error);
        return throwError(() => new Error('Error al obtener dulcería'));
      })
    );
  }

  getDulceriaById(id: number): Observable<Dulceria> {
    return this.http.get<Dulceria>(`${this.apiUrl}/${id}`).pipe(
      catchError((error: any) => {
        console.error(`Error al obtener dulcería con ID ${id}:`, error);
        return throwError(() => new Error(`Error al obtener dulcería con ID ${id}`));
      })
    );
  }

  // POST, PUT, DELETE methods with auth token
  createDulceria(dulceria: Dulceria): Observable<Dulceria> {
    const headers = this.getAuthHeaders();
    if (!headers) {
      return throwError(() => new Error('Usuario no autenticado'));
    }

    return this.http.post<Dulceria>(`${this.apiUrl}`, dulceria, { headers }).pipe(
      catchError((error: any) => {
        console.error('Error al crear dulcería:', error);
        return throwError(() => new Error('Error al crear dulcería'));
      })
    );
  }

  updateDulceria(id: number, dulceria: Dulceria): Observable<Dulceria> {
    const headers = this.getAuthHeaders();
    if (!headers) {
      return throwError(() => new Error('Usuario no autenticado'));
    }

    return this.http.put<Dulceria>(`${this.apiUrl}/${id}`, dulceria, { headers }).pipe(
      catchError((error: any) => {
        console.error(`Error al actualizar dulcería con ID ${id}:`, error);
        return throwError(() => new Error(`Error al actualizar dulcería con ID ${id}`));
      })
    );  
  }

  deleteDulceria(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    if (!headers) {
      return throwError(() => new Error('Usuario no autenticado'));
    }

    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError((error: any) => {
        console.error(`Error al eliminar dulcería con ID ${id}:`, error);
        return throwError(() => new Error(`Error al eliminar dulcería con ID ${id}`));
      })
    );
  }
}