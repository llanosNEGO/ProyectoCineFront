import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Dulceria } from '../../../models/Dulceria';

@Injectable({
  providedIn: 'root'
})
export class DulceriaApiService {

  private apiUrl = 'https://671b02feacf9aa94f6ac4a29.mockapi.io/Dulceria';
  constructor(private http: HttpClient) {}

  //Obtenemos toda la data de las movies 
  getDulceria(): Observable<Dulceria[]> {
    return this.http.get<Dulceria[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching movies:', error);
        return throwError(error);
      })
    );
  }

  getMovieById(id: string): Observable<Dulceria> {
    return this.http.get<Dulceria>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching movie details:', error);
        return throwError(error);
      })
    );
  }
}
