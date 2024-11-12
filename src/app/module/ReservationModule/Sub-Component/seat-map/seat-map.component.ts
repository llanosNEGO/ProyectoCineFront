import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SeatSelectionComponent } from '../seat-selection/seat-selection.component';
import { Rooms } from '../../../../models/Rooms';

@Component({
  selector: 'app-seat-map',
  standalone: true,
  imports: [NgFor, SeatSelectionComponent],
  templateUrl: './seat-map.component.html',
  styles: ``,
})
export class SeatMapComponent {
  @Input() selectedSeats: string[] = []; // Recibe la lista de asientos seleccionados
  @Output() seatSelect = new EventEmitter<string[]>(); // Emite la lista completa de asientos seleccionados

  //@Output() seatSelect = new EventEmitter<string>();
  // Instancia de la interfaz Cinema
  /*cinema: Cinema = {
    name: 'Cineplex',
    capacity: 30,
    capacitySeat: 10,
  };*/

  // Instancia de la interfaz Rooms
  room: Rooms = {
    idRooms: 1,
    name: 'Sala 1',
    rows: 5,
    colum: 6,
    movieHorios: [],
  };

  seatingLayout: string[][] = [];
  occupiedSeats: Set<string> = new Set();
  rowLabels = 'ABCDEFGHIJKLMNO'.split('');

  constructor() {
    this.seatingLayout = this.generateSeatingLayout();
    this.initializeOccupiedSeats();
  }

  /*onSeatSelect(seatId: string): void {
    const seatIndex = this.selectedSeats.indexOf(seatId);
    if (seatIndex === -1) {
      this.selectedSeats.push(seatId);
    } else {
      this.selectedSeats.splice(seatIndex, 1);
    }
    this.seatSelect.emit(seatId); // Emitir solo `seatId`
  }*/

  // Método para manejar la selección de asientos
  // Lógica para manejar la selección de asientos
  onSeatSelect(seatId: string): void {
    const seatIndex = this.selectedSeats.indexOf(seatId);
    if (seatIndex === -1) {
      this.selectedSeats.push(seatId); // Añade el asiento si no está seleccionado
    } else {
      this.selectedSeats.splice(seatIndex, 1); // Elimina el asiento si ya está seleccionado
    }
    this.seatSelect.emit([...this.selectedSeats]); // Emite el array completo de asientos seleccionados
  }

  generateSeatingLayout(): string[][] {
    const layout: string[][] = [];
    const rows = 5;
    const colum = 6;
    for (let i = 0; i < rows; i++) {
      const rowSeats: string[] = [];
      for (let j = 1; j <= colum; j++) {
        rowSeats.push(`${this.rowLabels[i]}${j}`);
      }
      layout.push(rowSeats);
    }
    return layout;
  }

  initializeOccupiedSeats(): void {
    const seatCount = Math.floor(this.seatingLayout.flat().length * 0.3);
    const seats = this.seatingLayout.flat();
    while (this.occupiedSeats.size < seatCount) {
      const randomSeat = seats[Math.floor(Math.random() * seats.length)];
      this.occupiedSeats.add(randomSeat);
    }
  }

  getSeatStatus(seatId: string): 'available' | 'occupied' | 'selected' | 'wheelchair' {
    const row = seatId.charAt(0);
    const number = parseInt(seatId.substring(1), 10);
    const isWheelchair = row === 'A' && (number === 1 || number === 2);

    return isWheelchair
      ? 'wheelchair'
      : this.selectedSeats.includes(seatId)
      ? 'selected'
      : this.occupiedSeats.has(seatId)
      ? 'occupied'
      : 'available';
  }

  /*

   rows = 'ABCDEFGHIJKLMNO'.split('');
  seatingLayout: string[][] = [];
  occupiedSeats: Set<string> = new Set();

  constructor() {
    this.seatingLayout = this.generateSeatingLayout();
    this.initializeOccupiedSeats();
  }

  onSeatSelect(seatId: string): void {
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
    const seatCount = Math.floor(this.cinema.capacity * 0.3); // 30% occupied
    const seats = this.seatingLayout.flat();
    
    while (this.occupiedSeats.size < seatCount) {
      const randomSeat = seats[Math.floor(Math.random() * seats.length)];
      this.occupiedSeats.add(randomSeat);
    }
  }

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
  
  */
}
