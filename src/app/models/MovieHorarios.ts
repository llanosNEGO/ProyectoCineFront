import { Horario } from './Horario';
import { Movie } from './Movie';

export interface MovieHorarios {
  movie: Movie;
  horarios: Horario[];
}
