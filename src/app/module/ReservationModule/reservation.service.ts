import { Injectable } from '@angular/core';
import { Reservation } from '../../models/Reservation';
import { Payment } from '../../models/Payment';
import { Movie } from '../../models/Movie';
import { Cine } from '../../models/Cine';
import { Firestore, collection, addDoc, Timestamp, doc, docData, collectionData, updateDoc } from '@angular/fire/firestore';
import { toast } from 'ngx-sonner';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid'; 

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservationDetails: Reservation = {
    movie: {} as Movie,
    cine: {} as Cine,
    format: '',
    time: '',
    selectedSeats: [] as string[],
    payment: {} as Payment,
  };

  //constructorto
  constructor(private firestore: Firestore) {}

  //Establece los detalles de la reserva, incluyendo la película, el cine, el formato y la hora.
  setReservationDetails(
    movie: Movie,
    cine: Cine,
    format: string,
    time: string
  ) {
    //this.reservationDetails.id=uuidv4();
    this.reservationDetails.movie = movie;
    this.reservationDetails.cine = cine;
    this.reservationDetails.format = format;
    this.reservationDetails.time = time;
  }

  //Añade un asiento a la lista de asientos seleccionados
  addSeat(seat: string) {
    this.reservationDetails.selectedSeats.push(seat);
  }

  //Devuelve los detalles actuales de la reserva.
  getReservationDetails(): Reservation {
    return this.reservationDetails;
  }

  //Establece los detalles del pago en la reserva.
  setPaymentDetails(payment: Payment) {
    this.reservationDetails.payment = payment;
  }

  //Muestra la data en la consola
  printData() {
    console.log('Detalles de la reserva:', this.reservationDetails);
  }

  //Borra la informacion de dicha reserva
  clearReservation() {
    this.reservationDetails = {
      id:'',
      movie: {} as Movie,
      cine: {} as Cine,
      format: '',
      time: '',
      selectedSeats: [],
      payment: {} as Payment,
    };
  }

  //Guardar la data de reservaciones
  // Guardar reservación en Firestore
  async saveReservation(): Promise<string> {
    try {
      // Validar que todos los campos necesarios estén presentes
      if (
        !this.reservationDetails.movie ||
        !this.reservationDetails.cine ||
        !this.reservationDetails.format ||
        !this.reservationDetails.time ||
        this.reservationDetails.selectedSeats.length === 0 ||
        !this.reservationDetails.payment
      ) {
        console.error('Error: Algunos campos de la reservación están vacíos');
        return ''; // Si hay campos vacíos, no continuar con la operación
      }
  
      // Añadir timestamp
      const reservationWithTimestamp = {
        ...this.reservationDetails,
        createdAt: Timestamp.fromDate(new Date()), // Convierte Date a Timestamp
      };
  
      // Guardar en Firestore
      const reservationsCollection = collection(this.firestore, 'reservations');
      const docRef = await addDoc(reservationsCollection, reservationWithTimestamp);
  
      console.log('Reservación guardada con ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error al guardar la reservación:', error);
      throw error;
    }
  }

  
  getReservationById(id: string): Observable<Reservation> {
    const docRef = doc(this.firestore, `reservations/${id}`);
    return docData(docRef) as Observable<Reservation>;
  }

  // Obtener todas las reservaciones
  getAllReservations(): Observable<Reservation[]> {
    const reservationsCollection = collection(this.firestore, 'reservations');
    return collectionData(reservationsCollection, { idField: 'id' }) as Observable<Reservation[]>;
  }

  // Actualizar una reservación
  async updateReservation(id: string, updateData: Partial<Reservation>): Promise<void> {
    try {
      const docRef = doc(this.firestore, `reservations/${id}`);
      await updateDoc(docRef, updateData);
      console.log('Reservación actualizada correctamente');
    } catch (error) {
      console.error('Error al actualizar la reservación:', error);
      throw error;
    }
  }
}


