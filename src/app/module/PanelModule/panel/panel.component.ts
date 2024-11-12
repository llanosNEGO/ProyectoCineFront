import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReservationService } from '../../ReservationModule/reservation.service';
import { Reservation } from '../../../models/Reservation';
import { MovieApiService } from '../../MovieModule/data-access/movie-api.service';
import { CinemaApiService } from '../../CinemasModule/data-access/cinema-api.service';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule],
  templateUrl: './panel.component.html',
  styles: ``,
  providers: [DatePipe],
})
export class PanelComponent {
  //vista:
  showReservations: boolean = false;
  showMovies: boolean = false;
  showCines: boolean = false;

  reservations: Reservation[] = []; // Cambiado a un arreglo de Reservation[]




  

  // Método para alternar entre reservas y películas
  toggleReservations() {
    this.showReservations = true;
    this.showMovies = false;
  }

  toggleMovies() {
    this.showReservations = false;
    this.showMovies = true;
  }

  toggleCines() {
    this.showReservations = false;
    this.showMovies = false;
    this.showCines = true;
  }



  // Constructor donde inyectas el servicio de reserva
  public constructor(private reservationService: ReservationService, 
    private movieService:MovieApiService,
    private cinemasServices:CinemaApiService
  ) {}

  // Método ngOnInit para inicializar los datos
  ngOnInit(): void {
    this.getReservation(); // Obtener todas las reservas
    this.fetchMovies();//Obtner datos de mi api
    this.fetchCines(); ///Obtner datos de api propi
  }



  getReservation() {
    this.reservationService.getAllReservations().subscribe(
      (data: Reservation[]) => {
        // Convertimos `createdAt` a `Date` si está en formato de timestamp
        this.reservations = data.map((reservation) => {
          if (
            reservation.createdAt &&
            typeof reservation.createdAt === 'object' &&
            'seconds' in reservation.createdAt
          ) {
            reservation.createdAt = new Date(
              reservation.createdAt.seconds * 1000
            );
          }
          return reservation;
        });
        console.log('Reservations panel: ', this.reservations);
      },
      (error) => {
        console.error('Error loading reservations:', error);
      }
    );
  }

  getFormattedDate(timestamp: Date | { seconds: number; nanoseconds: number } | undefined): Date | null {
    if (!timestamp) return null;
  
    if (timestamp instanceof Date) {
      return timestamp;
    } else if ('seconds' in timestamp && 'nanoseconds' in timestamp) {
      return new Date(timestamp.seconds * 1000);
    }
    return null;
  }

  /************************************************************ */
  //MovieDateBac
  movies:any[]=[];

  // Método para obtener las películas desde el servicio
  fetchMovies() {
    this.movieService.getMoviesbac().subscribe(
      (data) => {
        this.movies = data; // Asignamos la respuesta a `movies`
        console.log('Movies fetched:', this.movies);
      },
      (error) => {
        console.error('Error fetching movies:', error);
      }
    );
  }

  /***********************************************************/
  Cinemas:any[]=[];
  // Método para obtener las películas desde el servicio
  fetchCines() {
    this.cinemasServices.getCineBac().subscribe(
      (data) => {
        this.Cinemas = data; // Asignamos la respuesta a `movies`
        console.log('Cines fetched:', this.Cinemas);
      },
      (error) => {
        console.error('Error fetching movies:', error);
      }
    );
  }
}


