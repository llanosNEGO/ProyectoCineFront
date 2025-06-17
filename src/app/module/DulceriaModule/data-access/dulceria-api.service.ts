import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Dulceria } from '../../../models/Dulceria';

@Injectable({
  providedIn: 'root'
})
export class DulceriaApiService {
  public apiUrl = 'http://localhost:9090/v1/dulceria';
  constructor(private http: HttpClient) {}

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
  createDulceria(dulceria: Dulceria): Observable<Dulceria> {
    return this.http.post<Dulceria>(`${this.apiUrl}`, dulceria).pipe(
      catchError((error: any) => {
        console.error('Error al crear dulcería:', error);
        return throwError(() => new Error('Error al crear dulcería'));
      })
    );
  }
  updateDulceria(id: number, dulceria: Dulceria): Observable<Dulceria> {
    return this.http.put<Dulceria>(`${this.apiUrl}/${id}`, dulceria).pipe(
      catchError((error: any) => {
        console.error(`Error al actualizar dulcería con ID ${id}:`, error);
        return throwError(() => new Error(`Error al actualizar dulcería con ID ${id}`));
      })
    );  
  }
  deleteDulceria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error: any) => {
        console.error(`Error al eliminar dulcería con ID ${id}:`, error);
        return throwError(() => new Error(`Error al eliminar dulcería con ID ${id}`));
      })
    );
  }
}
