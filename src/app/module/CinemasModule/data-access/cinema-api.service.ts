import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Cine } from '../../../models/Cine';

@Injectable({
  providedIn: 'root'
})
export class CinemaApiService {
  private apiUrl = 'http://localhost:9090/v1/cinemas';
  private staticToken = 'eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiQURNSU4sREJBIiwidGVzdCI6Im1pdG9jb2RlLXRlc3QtdmFsdWUiLCJzdWIiOiJBZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NTE4MzcxOTYsImV4cCI6MTc1MTg1NTE5Nn0.lfNV2Xi83HftDm_iFEWqmZsXSXSXo6E4Z2ETrI0ErKvzEYB6RwXnPTibVS175x-QlSB3m5qI85jVmhIDf96hjA';

  constructor(private http: HttpClient) {}
private getAuthHeaders(): HttpHeaders {
  // Elimina cualquier espacio y caracter especial
  const cleanToken = this.staticToken.trim().replace(/\s+/g, '');
  return new HttpHeaders({
    'Authorization': `Bearer ${cleanToken}`,
    'Content-Type': 'application/json'
  });
}
  // Obtener todos los cines
  getAllCinemas(): Observable<Cine[]> {
    return this.http.get<Cine[]>(`${this.apiUrl}`).pipe(
      catchError((error: any) => {
        console.error('Error al obtener cines:', error);
        return throwError(() => new Error('Error al obtener cines'));
      })
    );
  }

  // Obtener un cine por ID
  getCinemaById(id: number): Observable<Cine> {
    return this.http.get<Cine>(`${this.apiUrl}/${id}`).pipe(
      catchError((error: any) => {
        console.error(`Error al obtener cine con ID ${id}:`, error);
        return throwError(() => new Error(`Error al obtener cine con ID ${id}`));
      })
    );
  }

  // Crear nuevo cine
createCinema(cinema: Cine): Observable<Cine> {
  const headers = this.getAuthHeaders();
  console.log('Headers being sent:', headers); // Debug
  
  return this.http.post<Cine>(`${this.apiUrl}`, cinema, { headers }).pipe(
    catchError((error: any) => {
      console.error('Full error response:', error); // Más detalles
      return throwError(() => new Error('Error al crear cine'));
    })
  );
}

  // Actualizar cine existente
  updateCinema(id: number, cinema: Cine): Observable<Cine> {
    const headers = this.getAuthHeaders();
    return this.http.put<Cine>(`${this.apiUrl}/${id}`, cinema, { headers }).pipe(
      catchError((error: any) => {
        console.error(`Error al actualizar cine con ID ${id}:`, error);
        return throwError(() => new Error(`Error al actualizar cine con ID ${id}`));
      })
    );
  }

  // Eliminar cine
  deleteCinema(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError((error: any) => {
        console.error(`Error al eliminar cine con ID ${id}:`, error);
        return throwError(() => new Error(`Error al eliminar cine con ID ${id}`));
      })
    );
  }
}