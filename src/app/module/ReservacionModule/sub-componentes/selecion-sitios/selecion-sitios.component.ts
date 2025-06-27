import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Rooms, SeatStatus } from '../../../../models/Rooms';
import { ReservationService } from '../../service/reservacion.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SitiosComponent } from "../sitios/sitios.component";
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-selecion-sitios',
  templateUrl: './selecion-sitios.component.html',
  styleUrls: ['./selecion-sitios.component.css'],
  standalone: true,
  imports: [SitiosComponent, NgClass, NgFor]
})
export class SelecionSitiosComponent implements OnInit {
  @Input() selectedSeats: string[] = [];
  @Input() maxSelection = 8;
  @Output() seatSelect = new EventEmitter<string[]>();
  
  rowLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''); 

  room: Rooms = {
    idRooms: 1,
    name: 'Sala 1',
    num_rows: 8,
    colum: 10,
    wheelchairPositions: ['A1', 'A2'],
    occupiedSeats: [],
    movieHorios: []
  };
  legendItems = [
    { color: 'bg-gray-200', label: 'Disponible' },
    { color: 'bg-red-500', label: 'Ocupado' },
    { color: 'bg-blue-500', label: 'Seleccionado' },
    { color: 'bg-purple-500', label: 'Silla de ruedas' }
  ];
  
  seatingLayout: string[][] = [];
  private destroyed$ = new Subject<void>();

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.generateSeatingLayout();
    this.loadInitialSeats();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private loadInitialSeats(): void {
    this.reservationService.reservation$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(reservation => {
        this.selectedSeats = reservation.selectedSeats || [];
      });
  }

  generateSeatingLayout(): void {
    this.seatingLayout = [];
    const rowLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    
    for (let row = 0; row < this.room.num_rows; row++) {
      const rowSeats: string[] = [];
      for (let col = 1; col <= this.room.colum; col++) {
        rowSeats.push(`${rowLabels[row]}${col}`);
      }
      this.seatingLayout.push(rowSeats);
    }
  }

  onSeatSelect(seatId: string): void {
    const seatIndex = this.selectedSeats.indexOf(seatId);
    const isOccupied = this.isSeatOccupied(seatId);
    
    if (isOccupied) return;

    if (seatIndex === -1) {
      if (this.selectedSeats.length >= this.maxSelection) {
        // Mostrar mensaje de límite alcanzado
        return;
      }
      this.selectedSeats.push(seatId);
    } else {
      this.selectedSeats.splice(seatIndex, 1);
    }
    
    this.seatSelect.emit([...this.selectedSeats]);
  }

  getSeatStatus(seatId: string): SeatStatus {
    if (this.room.wheelchairPositions.includes(seatId)) {
      return 'wheelchair';
    } else if (this.selectedSeats.includes(seatId)) {
      return 'selected';
    } else if (this.isSeatOccupied(seatId)) {
      return 'occupied';
    } else {
      return 'available';
    }
  }

  private isSeatOccupied(seatId: string): boolean {
    return this.room.occupiedSeats.includes(seatId);
  }
}