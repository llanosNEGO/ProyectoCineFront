import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Dulceria } from '../../../models/Dulceria';

@Injectable({
  providedIn: 'root'
})
export class DulceriaApiService {
  public apiUrl = 'http://localhost:9090/v1/dulceria';
  private token = 'eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiQURNSU4sREJBIiwidGVzdCI6Im1pdG9jb2RlLXRlc3QtdmFsdWUiLCJzdWIiOiJBZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NTE4NTY1NjQsImV4cCI6MTc1MTg3NDU2NH0.3wAdSkZxgpbWruYlQl6maCVsZD2AM7TSKIJOjNpc2w4QrFRZJnITGN3b0aVZ_RWqgBIsWpc2C7O2hCejOFb9HA';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
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
    return this.http.post<Dulceria>(`${this.apiUrl}`, dulceria, { headers: this.getAuthHeaders() }).pipe(
      catchError((error: any) => {
        console.error('Error al crear dulcería:', error);
        return throwError(() => new Error('Error al crear dulcería'));
      })
    );
  }

  updateDulceria(id: number, dulceria: Dulceria): Observable<Dulceria> {
    return this.http.put<Dulceria>(`${this.apiUrl}/${id}`, dulceria, { headers: this.getAuthHeaders() }).pipe(
      catchError((error: any) => {
        console.error(`Error al actualizar dulcería con ID ${id}:`, error);
        return throwError(() => new Error(`Error al actualizar dulcería con ID ${id}`));
      })
    );  
  }

  deleteDulceria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError((error: any) => {
        console.error(`Error al eliminar dulcería con ID ${id}:`, error);
        return throwError(() => new Error(`Error al eliminar dulcería con ID ${id}`));
      })
    );
  }
}