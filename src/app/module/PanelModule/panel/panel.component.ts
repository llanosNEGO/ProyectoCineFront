import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReservationService } from '../../ReservationModule/reservation.service';
import { Reservation } from '../../../models/Reservation';

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

  reservations: Reservation[] = []; // Cambiado a un arreglo de Reservation[]

  products: any = [
    {
      codigo: '00056893',
      imagen: 'assets/monitor.jpg',
      modelo: '20CMX45',
      producto: 'clau',
      fabricante: 'Dell',
      estado: 'Activo',
      stock: 0,
      precio: 92.0,
    },
  ];

  // Método para alternar entre reservas y películas
  toggleReservations() {
    this.showReservations = true;
    this.showMovies = false;
  }

  toggleMovies() {
    this.showReservations = false;
    this.showMovies = true;
  }

  // Constructor donde inyectas el servicio de reserva
  public constructor(private reservationService: ReservationService) {}

  // Método ngOnInit para inicializar los datos
  ngOnInit(): void {
    this.getReservation(); // Obtener todas las reservas
  }

  // Método para obtener las reservas del servicio
  /*getReservations() {
   this.reservationService.getAllReservations().subscribe(
     (data: Reservation[]) => {  // Asegúrate de que el tipo aquí es Reservation[]
       this.reservations = data;  // Asigna el arreglo de reservas
       console.log('Reservations panel: ', this.reservations);
     },
     (error) => {
       console.error('Error loading reservations:', error);
     }
   );
 }*/

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
  
}


