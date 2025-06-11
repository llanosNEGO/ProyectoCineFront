import { Component } from '@angular/core';
import { Slide, SliderComponent } from "../../shared/iu/slider/slider.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MovieListComponent } from '../MovieModule/movie-list/movie-list.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent, CommonModule, RouterModule, MovieListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  youtubeUrl = 'https://www.youtube.com/embed/9JIyINjMfcc?autoplay=1&mute=1&loop=1&playlist=9JIyINjMfcc';

  slides: Slide[] = [
    {
      url: 'https://cinemarkla.modyocdn.com/uploads/b8a61ab9-76e2-4aba-9c88-5b86ba8b809d/original/BANNER-WEB-XD.png',
      text: 'Slide 1',
      imagen: 'image..',
    },
    {
      url: 'https://www.cinerama.com.pe/_admin/assets/images/slider/LILO-Y-STITCH-LIVE-ACTION.jpg',
      text: 'Slide 2',
      imagen: 'image..',
    },
    {
      url: 'https://cinemarkla.modyocdn.com/uploads/93aafc54-1458-4597-929e-eb13fb496219/original/1-Banner-web-pelis.png',
      text: 'Slide 3',
      imagen: 'image..',
    },
  ];

  movies = [
    { title: 'Una Boda de Locos', image: 'https://cdn.apis.cineplanet.com.pe/CDN/media/entity/get/FilmPosterGraphic/HO00002088?referenceScheme=HeadOffice&allowPlaceHolder=true' },
    { title: 'La Francotiradora', image: 'https://cdn.apis.cineplanet.com.pe/CDN/media/entity/get/FilmPosterGraphic/HO00002088?referenceScheme=HeadOffice&allowPlaceHolder=true' },
    { title: 'Pecados', image: 'https://cdn.apis.cineplanet.com.pe/CDN/media/entity/get/FilmPosterGraphic/HO00002104?referenceScheme=HeadOffice&allowPlaceHolder=true' },
    { title: 'Mi Maestra Favorita', image: 'https://cdn.apis.cineplanet.com.pe/CDN/media/entity/get/FilmPosterGraphic/HO00002203?referenceScheme=HeadOffice&allowPlaceHolder=true' },
    { title: 'Masacre en Texas', image: 'https://cdn.apis.cineplanet.com.pe/CDN/media/entity/get/FilmPosterGraphic/HO00002187?referenceScheme=HeadOffice&allowPlaceHolder=true' },
    { title: 'Policías', image: 'https://cdn.apis.cineplanet.com.pe/CDN/media/entity/get/FilmPosterGraphic/HO00002008?referenceScheme=HeadOffice&allowPlaceHolder=true' },
   
  ];

}
