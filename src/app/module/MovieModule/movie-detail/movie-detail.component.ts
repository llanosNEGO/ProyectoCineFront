import { Component } from '@angular/core';
import { Movie } from '../../../models/Movie';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieApiService } from '../../MovieModule/data-access/movie-api.service';
import { NgFor, NgIf } from '@angular/common';
import { Cine } from '../../../models/Cine';
import { CinemaApiService } from '../../CinemasModule/data-access/cinema-api.service';
import { CinemaSelecionComponent } from '../../../shared/iu/cinema-selecion/cinema-selecion.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Cinemas } from '../../../models/Cinemas';
import { HttpErrorResponse } from '@angular/common/http';


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
  error: string | null = null;
  loading = true;
  showReservacion = false;
 

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
    const id = Number(movieId); // Convertir a número
    if (isNaN(id)) {
      this.error = 'ID de película inválido';
      this.loading = false;
      return;
    }

    this.loadMovie(id);
    this.loadCinemas();
  } else {
    this.error = 'No se proporcionó ID de película';
    this.loading = false;
  }
}
loadMovie(id : number):void {
  this.movieService.getMovieById(id).subscribe({
    next: (data : Movie) => {
      this.movie = data;
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.getEmbedUrl(data.urlTrailer)
      );
      this.loading = false;
    },
    error: (err: HttpErrorResponse) => {
      console.error('Error loading movie:', err);
      this.error = 'Error al cargar la película';
      this.loading = false;
    }
  })
}

loadCinemas(): void {
  this.cineService.getAllCinemas().subscribe({
    next: (data: any) => { // Usa any temporalmente o crea interfaz correcta
      this.cine = data.map((cinema: any) => ({
        id: cinema.id, 
        name: cinema.name,
        description: cinema.description,
        address: cinema.address,
        urlImage: cinema.urlImage,
        disponible: cinema.disponible || [],
        horarios: cinema.horarios || [],      
        rooms: cinema.rooms || [],
        city: cinema.city?.nameCity || ''
      }));
      console.log('Cines mapeados', this.cine);
    },
    error: (err: HttpErrorResponse) => {
      console.error('Error loading cinemas:', err);
    }
  });
}
goToReservationWithDetails(cineName: string, format: string, time: string): void {
    if (this.movie) {
      this.router.navigate(['/reservacion'], {
        state: {
          movie: this.movie,
          cine: this.cine.find((cine) => cine.name === cineName),
          format: format,
          time: time
        }
      });
    }
  }

  getEmbedUrl(url: string): string {
    const videoId = this.extractVideoId(url);
    return `https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1`;
  }

  extractVideoId(url: string): string {
    const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return videoIdMatch ? videoIdMatch[1] : '';
  }

  // modal para abrir reserva

  toggleReservacion() {
    this.showReservacion = !this.showReservacion;
    if(this.showReservacion){
      setTimeout(() => {
        const element = document.querySelector('.max-w-4xl.bg-gray-900');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      },100);
    }
  }
}
