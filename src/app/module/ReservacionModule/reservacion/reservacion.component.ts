import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from '../../../models/Movie';
import { ReservationService } from '../service/reservacion.service';
import { Cine } from '../../../models/Cine';
import { SelecionSitiosComponent } from "../sub-componentes/selecion-sitios/selecion-sitios.component";
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservacion.component.html',
  styleUrls: ['./reservacion.component.css'],
  standalone: true,
  imports: [SelecionSitiosComponent, CommonModule],
  
})
export class ReservacionComponent implements OnDestroy {
  movie?: Movie;
  cine?: Cine;
  format?: string;
  time?: string;
  selectedSeats: string[] = [];
  maxSeats = 8; // Límite de asientos por reserva
  private subs: Subscription[] = [];

  constructor(
    private router: Router,
    private reservationService: ReservationService
  ) {
    this.loadReservationData();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
  ngOnInit() {
  const navigation = this.router.getCurrentNavigation();
  const state = navigation?.extras.state as {
    movie: Movie,
    cine: Cine,
    format: string,
    time: string,
    selectedSeats: string[]
  };
  
  if (state) {
    this.selectedSeats = state.selectedSeats || [];
    // Actualizar el servicio
    this.reservationService.updateSelectedSeats(this.selectedSeats);
  }
}

  private loadReservationData(): void {
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
    } else {
      // Si no hay estado, redirigir o cargar datos de otra forma
      this.router.navigate(['/']);
    }
  }

  handleSeatSelect(seats: string[]): void {
    if (seats.length > this.maxSeats) {
      // Mostrar error o notificación
      return;
    }
    
    this.selectedSeats = seats;
    this.reservationService.updateSelectedSeats(seats);
  }

  handleContinue(): void {
    if (this.selectedSeats.length === 0) {
      // Usar un servicio de notificaciones en lugar de alert
      this.showError('Por favor seleccione al menos un asiento');
      return;
    }
    
    if (!this.movie || !this.cine || !this.format || !this.time) {
      this.showError('Información de reserva incompleta');
      return;
    }
    
    this.router.navigate(['/pagos']);
  }

  private showError(message: string): void {
    // Implementar notificación bonita
    console.error(message);
  }

getCurrentDay(): string {
  const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const today = new Date().getDay();
  return days[today];
}
}