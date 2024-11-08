import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SeatSelectionComponent } from "../../Sub-Component/seat-selection/seat-selection.component";
import { SeatMapComponent } from "../../Sub-Component/seat-map/seat-map.component";
import { Movie } from '../../../../models/Movie';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [SeatSelectionComponent, SeatMapComponent, NgFor],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent {

  movie?:Movie;

  selectedSeats: string[] = [];

  //Modifique
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { movie: Movie };
    this.movie = state.movie;
  }



  handleSeatSelect(seatId: any): void {
    if (this.selectedSeats.includes(seatId)) {
      this.selectedSeats = this.selectedSeats.filter(id => id !== seatId);
    } 
  }



  handleContinue(): void {
    if (this.selectedSeats.length === 0) {
      alert('Por favor seleccione al menos un asiento');
      return;
    }
    this.router.navigate(['/payment'], { state: { selectedSeats: this.selectedSeats } });
  }
}
