import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Cinemas } from '../../../models/Cinemas';
import { HttpClient } from '@angular/common/http';
import { Cine } from '../../../models/Cine';

@Injectable({
  providedIn: 'root',
})
export class CinemaApiService {
  
  obtenerCine(): Observable<Cinemas> {
    const cineEjemplo: Cinemas = {
      idCinemas: 1,
      nameCinemas: 'Cineplex',
      address: 'Av. Principal 123',
      description: '',
      city: 'Lima',
      rooms: [
        {
          idRooms: 1,
          name: 'Sala 1',
          rows: 2,
          colum: 2,

          movieHorios: [
            {
              movie: {
                id: '101',
                title: 'Avengers: Endgame',
                genre: 'Acción',
                durationMovie: '180',
                age: 'Mayores de 13 años',
                sinopsis: 'Los Vengadores se enfrentan a su mayor desafío...',
                director: 'Anthony y Joe Russo',
                url: 'url_imagen_avengers',
                idioma: ['Español', 'Inglés'],
                status: ['Estreno'],
                urlTrailer: 'url_trailer_avengers',
                idCinemas: ['1', '2'],
                disponible: ['14:00', '18:00', '21:00'],
              },

              horarios: [{ idHorario: 1, hora: ['10: 00 Am', '10: 00 Am'] }],
            },
          ],
        },
      ],
    };

    // Devolver el cine como un Observable simulando una llamada de red
    return of(cineEjemplo);
  }
  



  private apiUrl = 'https://66e36081494df9a478e50f0a.mockapi.io/api/cine/cines';
  constructor(private http: HttpClient) {}

  //Obtenemos toda la data de las movies
  getCine(): Observable<Cine[]> {
    return this.http.get<Cine[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching cines:', error);
        return throwError(error);
      })
    );
  }

  getCineById(id: string): Observable<Cine> {
    return this.http.get<Cine>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching cine details:', error);
        return throwError(error);
      })
    );
  }

  /************************************************************* */
  private apiUrl2 = 'http://127.0.0.1:8080/v1/cines/cinemas';
  //Obtenemos toda la data de las movies
  getCineBac(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl2).pipe(
      catchError((error) => {
        console.error('Error fetching cinesBac:', error);
        return throwError(error);
      })
    );
  }

}
