import { Rooms } from "./Rooms";

export interface Cinemas {
  idCinemas: number;
  nameCinemas: string;
  city: String;
  description: string;
  address: string;

  //un cine tiene diferentes salas
  rooms: Rooms[];

}
