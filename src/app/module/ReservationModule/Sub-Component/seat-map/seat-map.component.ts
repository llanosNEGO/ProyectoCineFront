import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SeatSelectionComponent } from '../seat-selection/seat-selection.component';
import { Cinema } from '../../../../models/cinema';

@Component({
  selector: 'app-seat-map',
  standalone: true,
  imports: [NgFor, SeatSelectionComponent],
  templateUrl: './seat-map.component.html',
  styles: ``,
})
export class SeatMapComponent {
  //es una propiedad de entrada que puede ser pasada desde un componente padre.
  @Input() selectedSeats: string[] = [];
  //es una propiedad de salida que puede ser pasada a un componente padre.
  @Output() seatSelect = new EventEmitter<string[]>();

  // Instancia de la interfaz Cinema
  cinema: Cinema = {
    name: 'Cineplex',
    capacity: 30,
    capacitySeat: 10, // Number of seats per row
  };

  rows = 'ABCDEFGHIJKLMNO'.split('');
  // Main layout to store generated seats
  seatingLayout: string[][] = [];
  occupiedSeats: Set<string> = new Set();

  constructor() {
    this.seatingLayout = this.generateSeatingLayout();
    this.initializeOccupiedSeats();
  }

  onSeatSelect(seatId: string): void {
    // Toggle seat selection
    const seatIndex = this.selectedSeats.indexOf(seatId);
    
    if (seatIndex === -1) {
      this.selectedSeats.push(seatId); // Add seat if not already selected
    } else {
      this.selectedSeats.splice(seatIndex, 1); // Deselect seat if already selected
    }

    this.seatSelect.emit([...this.selectedSeats]); // Emit updated selected seats
  }
  

  generateSeatingLayout(): string[][] {
    const layout: string[][] = [];
    const totalRows = Math.ceil(this.cinema.capacity / this.cinema.capacitySeat);
    let seatCounter = 1;

    for (let i = 0; i < totalRows; i++) {
      const rowSeats: string[] = [];
      for (let j = 1; j <= this.cinema.capacitySeat; j++) {
        if (seatCounter > this.cinema.capacity) break;
        rowSeats.push(`${this.rows[i]}${j}`);
        seatCounter++;
      }
      layout.push(rowSeats);
    }

    return layout;
  }



  initializeOccupiedSeats(): void {
    // Set some seats as occupied initially, for example:
    const seatCount = Math.floor(this.cinema.capacity * 0.3); // 30% occupied
    const seats = this.seatingLayout.flat();
    
    while (this.occupiedSeats.size < seatCount) {
      const randomSeat = seats[Math.floor(Math.random() * seats.length)];
      this.occupiedSeats.add(randomSeat);
    }
  }

  // Define seat statuses for styling and functionality
  getSeatStatus(seatId: string): 'available' | 'occupied' | 'selected' | 'wheelchair' {
    const row = seatId.charAt(0);
    const number = parseInt(seatId.substring(1), 10);
    const isWheelchair = row === 'A' && (number === 7 || number === 8);

    return isWheelchair
      ? 'wheelchair'
      : this.selectedSeats.includes(seatId)
      ? 'selected'
      : this.occupiedSeats.has(seatId)
      ? 'occupied'
      : 'available';
  }
}
