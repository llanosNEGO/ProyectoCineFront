import { Component } from '@angular/core';
import { Movie } from '../../../models/Movie';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieApiService } from '../../MovieModule/data-access/movie-api.service';
import { NgFor, NgIf } from '@angular/common';
import { Cine } from '../../../models/Cine';
import { CinemaApiService } from '../../CinemasModule/data-access/cinema-api.service';
import { CinemaSelecionComponent } from '../../../shared/iu/cinema-selecion/cinema-selecion.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [NgIf, NgFor, CinemaSelecionComponent],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent {
  movie?: Movie;
  cine: Cine[] = [];
  //decalarmos la propiedad safeUrl : tipo SafeResourceUrl Es un tipo proporcionado por Angular que representa una URL que ha 
  //sido sanitizada para ser segura de  usar en un contexto de recursos. osea incrustar un video de yotube
  safeUrl: SafeResourceUrl | undefined;
 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private movieService: MovieApiService,
    private cineService: CinemaApiService,
    private sanitizer:DomSanitizer //Este servicio se utiliza para sanitizar contenido dinámico, como URLs, HTML, estilos, etc.,
  ) {}

  /*******************************Api********************************************** */
  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.movieService.getMovieById(movieId).subscribe((data: Movie) => {
        this.movie = data;
        //esta línea se utiliza para sanitizar la URL de un video de YouTube antes de incrustarlo en un iframe.
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.getEmbedUrl(this.movie.urlTrailer));
      });
    }

    // Llamar al método dataCine para obtener los cines
    this.dataCine();
  }


  //obtenemos los cines de  nuestra api
  dataCine(): void {
    this.cineService.getCine().subscribe((data: Cine[]) => {
      this.cine = data;
    });
  }

  /***********************************Data de cine selecionado************************************************ */

  // Method to navigate with selected time, format, and cinema name
  goToReservationWithDetails(cineName: string, format: string, time: string): void {
    if (this.movie) {
      this.router.navigate(['/reservation'], {
        state: {
          movie: this.movie,
          cine: this.cine.find((cine) => cine.name === cineName),
          format: format,
          time: time
        }
      });
    }
  }

  /*********************************Logica para ver un video de youtube*****************/
  getEmbedUrl(url: string): string {
    //Este método toma una URL de YouTube y devuelve la URL de incrustación correspondiente para usarla en un iframe.
    const videoId = this.extractVideoId(url);
    return `https://www.youtube.com/embed/${videoId}`;
  }

  extractVideoId(url: string): string {
    //Usa una expresión regular para buscar y capturar el ID del video en la URL de YouTube. 
    const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    // Devuelve el ID del video si se encuentra una coincidencia;
    return videoIdMatch ? videoIdMatch[1] : '';
  }
  
}
