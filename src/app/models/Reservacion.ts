import { Cine } from "./Cine";
import { Movie } from "./Movie";
import { Payment } from "./Payment";

export interface Reservation {
    id?: string; // Añadimos ID para Firestore
    movie: Movie;
    cine: Cine;
    format: string;
    time: string;
    selectedSeats: string[];
    payment: Payment;
    userId?: string; // Opcional: para vincular con el usuario
    // Opcional: para timestamp
    createdAt?: Date | { seconds: number; nanoseconds: number };
}
  