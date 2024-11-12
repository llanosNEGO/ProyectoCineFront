import { Horario } from "./Horario";
import { MovieHorarios } from "./MovieHorarios";

export interface Rooms {
    idRooms: number;
    name: string;
    rows: number;
    colum: number;

    //una sala tiene diferentes horarios
    movieHorios: MovieHorarios[];
}