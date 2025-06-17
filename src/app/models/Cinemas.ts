import { Cities } from "./City";
import { Rooms } from "./Rooms";

export interface Cinemas {
  idCinemas: number;
  nameCinema: string;
  description: string;
  address: string;
  city: Cities;
  rooms?: Rooms[];
}