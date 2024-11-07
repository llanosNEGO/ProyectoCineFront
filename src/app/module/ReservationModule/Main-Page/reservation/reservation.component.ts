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

  // Instance el objeto movie
  movie: Movie = {
    title: 'The Matrix',
    image: 'https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg',
    format: ['2D', '3D'],
    cinema: 'Cinema 1',
    date: '2021-04-15',
    hours: '15:00',
    room: 'Room 1',
  };

  selectedSeats: string[] = [];

  constructor(private router: Router) {}

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
