import { Horario } from "./Horario";
import { MovieHorarios } from "./MovieHorarios";

export interface Rooms {
    idRooms: number;
    name: string;
    num_rows: number;
    colum: number;
    wheelchairPositions: string[]; // Added to match your component
    occupiedSeats: string[]; // Added to match your component
    //una sala tiene diferentes horarios
    movieHorios: MovieHorarios[];
}
export type SeatStatus = 'available' | 'selected' | 'occupied' | 'wheelchair';