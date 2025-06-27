import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, Timestamp, doc, docData, collectionData, updateDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../../../models/Movie';
import { Reservation } from '../../../models/Reservacion';
import { Cine } from '../../../models/Cine';
import { Payment } from '../../../models/Payment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservationSubject = new BehaviorSubject<Reservation>(this.getEmptyReservation());
  reservation$ = this.reservationSubject.asObservable();

  constructor(private firestore: Firestore) {}

  // Establece los detalles iniciales de la reserva
  setReservationDetails(movie: Movie, cine: Cine, format: string, time: string): void {
    const current = this.reservationSubject.value;
    this.reservationSubject.next({
      ...current,
      movie,
      cine,
      format,
      time
    });
  }

  // Añade o actualiza los asientos seleccionados
  updateSelectedSeats(seats: string[]): void {
    const current = this.reservationSubject.value;
    this.reservationSubject.next({
      ...current,
      selectedSeats: seats
    });
  }

  // Establece los detalles del pago
  setPaymentDetails(payment: Payment): void {
    const current = this.reservationSubject.value;
    this.reservationSubject.next({
      ...current,
      payment
    });
  }

  // Obtiene la reserva actual (sincrónico)
  get currentReservation(): Reservation {
    return this.reservationSubject.value;
  }

  // Obtiene la reserva actual (observable)
  getReservationDetails(): Reservation {
    return this.reservationSubject.value;
  }

  // Guarda la reserva en Firestore
  async saveReservation(): Promise<string> {
    const reservation = this.currentReservation;
    
    if (!this.validateReservation(reservation)) {
      throw new Error('Datos de reservación incompletos');
    }

    try {
      const reservationWithTimestamp = {
        ...reservation,
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date())
      };

      const docRef = await addDoc(
        collection(this.firestore, 'reservations'), 
        reservationWithTimestamp
      );

      this.clearReservation();
      return docRef.id;
    } catch (error) {
      console.error('Error al guardar reservación:', error);
      throw error;
    }
  }

  // Obtiene una reserva por ID
  getReservationById(id: string): Observable<Reservation> {
    const docRef = doc(this.firestore, `reservations/${id}`);
    return docData(docRef) as Observable<Reservation>;
  }

  // Obtiene todas las reservaciones
  getAllReservations(): Observable<Reservation[]> {
    const reservationsCollection = collection(this.firestore, 'reservations');
    return collectionData(reservationsCollection, { idField: 'id' }) as Observable<Reservation[]>;
  }

  // Actualiza una reservación existente
  async updateReservation(id: string, updateData: Partial<Reservation>): Promise<void> {
    try {
      const docRef = doc(this.firestore, `reservations/${id}`);
      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error('Error al actualizar reservación:', error);
      throw error;
    }
  }

  // Limpia la reserva actual
  clearReservation(): void {
    this.reservationSubject.next(this.getEmptyReservation());
  }

  // Muestra los datos en consola (para debugging)
  printData(): void {
    console.log('Detalles de reserva:', this.currentReservation);
  }

  // Valida que la reserva tenga todos los campos necesarios
  private validateReservation(reservation: Reservation): boolean {
    return !!reservation.movie && 
           !!reservation.cine &&
           !!reservation.format &&
           !!reservation.time &&
           reservation.selectedSeats.length > 0 &&
           !!reservation.payment;
  }

  // Retorna una reserva vacía
  private getEmptyReservation(): Reservation {
    return {
      id: '',
      movie: {} as Movie,
      cine: {} as Cine,
      format: '',
      time: '',
      selectedSeats: [],
      payment: {} as Payment
    };
  }
}