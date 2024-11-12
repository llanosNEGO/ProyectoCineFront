import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/iu/header/header.component';
import { NgxSonnerToaster, toast } from 'ngx-sonner';
import { Slide, SliderComponent } from './shared/iu/slider/slider.component';
import { MovieCardComponent } from './shared/iu/movie-card/movie-card.component';
import { MovieApiService } from './module/MovieModule/data-access/movie-api.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CinemaDetailComponent } from "./module/CinemasModule/cinema-detail/cinema-detail.component";
import { HomeComponent } from "./module/home/home.component";
import { ReservationService } from './module/ReservationModule/reservation.service';
import { FooterComponent } from "./shared/iu/footer/footer.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    NgxSonnerToaster,
    SliderComponent,
    MovieCardComponent,
    HttpClientModule,
    CommonModule,
    CinemaDetailComponent,
    HomeComponent,
    FooterComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ng-cinerama-18';

  slides: Slide[] = [
    {
      url: 'https://cinemarkla.modyocdn.com/uploads/1c41a890-8528-4f34-97c0-13b1340c0c05/original/BANNER_WEB_COMBINACION_VENOM.png',
      text: 'Slide 1',
      imagen: 'image..',
    },
    {
      url: 'https://cinemarkla.modyocdn.com/uploads/1c4739fa-8e42-43b1-8b69-a0f93c7bdcf2/original/BANNER-HOME-VENOM-P.png',
      text: 'Slide 2',
      imagen: 'image..',
    },
    {
      url: 'https://cinemarkla.modyocdn.com/uploads/d1f47d99-13ac-4856-919a-33e890f73f1d/original/BANNER-HOME-COMBOS-ONLINE.png',
      text: 'Slide 3',
      imagen: 'image..',
    },
  ];

  Movie: any[] = [];
  movieSummaries: any[] = [];
  Reservation:any[]=[];

  constructor(private movieService: MovieApiService,private reservationService:ReservationService) {}

  ngOnInit(): void {
    

    this.getMovie();
    this.getReservation();
    
  }

  getMovie(){
    this.movieService.getMovies().subscribe(
      (data) => {
        this.Movie = data;
        console.log('Movies loaded:', this.Movie);
      },
      (error) => {
        console.error('Error loading tasks:', error);
      }
    );
  }


  getReservation() {
    this.reservationService.getAllReservations().subscribe(
      (data)=>{
        this.Reservation=data;
        console.log('Reservation: ',this.Reservation);
      },
      (error) => {
        console.error('Error loading reservation:', error);
      }
    );
  }
}
