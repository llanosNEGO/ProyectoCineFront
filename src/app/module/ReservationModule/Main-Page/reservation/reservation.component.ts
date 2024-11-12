import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SeatSelectionComponent } from '../../Sub-Component/seat-selection/seat-selection.component';
import { SeatMapComponent } from '../../Sub-Component/seat-map/seat-map.component';
import { Movie } from '../../../../models/Movie';
import { NgFor } from '@angular/common';
import { Cine } from '../../../../models/Cine';
import { ReservationService } from '../../reservation.service';
import { Reservation } from '../../../../models/Reservation';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [SeatSelectionComponent, SeatMapComponent, NgFor],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css',
})
export class ReservationComponent {
  movie?: Movie;
  cine?: Cine;
  format?: string;
  time?: string;
  selectedSeats: string[] = [];

  constructor(
    private router: Router,
    private reservationService: ReservationService
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      movie: Movie;
      cine: Cine;
      format: string;
      time: string;
    };
    if (state) {
      this.movie = state.movie;
      this.cine = state.cine;
      this.format = state.format;
      this.time = state.time;
      this.reservationService.setReservationDetails(
        this.movie,
        this.cine,
        this.format,
        this.time
      );
    }
  }


  handleSeatSelect(seats: string[]): void {
    // Actualizar los asientos seleccionados en el servicio y en el componente
    this.selectedSeats = seats;
    this.selectedSeats.forEach((seat) => this.reservationService.addSeat(seat));
    console.log('Asientos seleccionados:', this.selectedSeats);
  }

  handleContinue(): void {
    if (this.selectedSeats.length === 0) {
      alert('Por favor seleccione al menos un asiento');
      return;
    }
    this.router.navigate(['/payment']);
  }

  // Método opcional para verificar en consola los datos actuales de la reserva
  printCurrentReservation(): void {
    this.reservationService.printData();
  }
  
  /*movie?: Movie;
  selectedSeats: string[] = [];*/

  /*****************Datos selecionados en movieDatil******************* */
  /* cineName?: string;
  sala?:string;
  format?: string;
  time?: string;

  ngOnInit(): void {
    console.log('Selected seats on init:', this.selectedSeats);
  }
    */

  //Modifique
  /*constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { movie: Movie };
    this.movie = state.movie;
  }*/

  /*
  constructor(private router: Router, private reservationService: ReservationService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      movie: Movie;
      cineName: string;
      format: string;
      time: string;
    };
    if (state) {
      this.movie = state.movie;
      this.cineName = state.cineName;
      this.format = state.format;
      this.time = state.time;
    }

    console.log(this.cineName)
    console.log(this.format)
    console.log(this.time)
  }

  handleSeatSelect(seatId: any): void {
    if (this.selectedSeats.includes(seatId)) {
      this.selectedSeats = this.selectedSeats.filter((id) => id !== seatId);
    }
  }

  handleContinue(): void {
    if (this.selectedSeats.length === 0) {
      alert('Por favor seleccione al menos un asiento');
      return;
    }
    this.router.navigate(['/payment'], {
      state: { selectedSeats: this.selectedSeats },
    });
  }

  const reservation: Reservation = {
    movie: this.movie!,
    cine: { id: "1",sala:[this.]; name: this.cineName!, disponible: [this.format!], address: 'Dirección Cine' },
    time: this.time!,
    selectedSeats: this.selectedSeats,
  };

  this.reservationService.setReservation(reservation);
  this.router.navigate(['/payment']);

  */
}
