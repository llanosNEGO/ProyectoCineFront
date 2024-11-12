import { Component } from '@angular/core';
import { Slide, SliderComponent } from "../../shared/iu/slider/slider.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../../shared/iu/header/header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent, CommonModule, RouterModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

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

  movies = [
    { title: 'Una Boda de Locos', image: 'https://cdn.apis.cineplanet.com.pe/CDN/media/entity/get/FilmPosterGraphic/HO00002088?referenceScheme=HeadOffice&allowPlaceHolder=true' },
    { title: 'La Francotiradora', image: 'https://cdn.apis.cineplanet.com.pe/CDN/media/entity/get/FilmPosterGraphic/HO00002088?referenceScheme=HeadOffice&allowPlaceHolder=true' },
    { title: 'Pecados', image: 'https://cdn.apis.cineplanet.com.pe/CDN/media/entity/get/FilmPosterGraphic/HO00002104?referenceScheme=HeadOffice&allowPlaceHolder=true' },
    { title: 'Mi Maestra Favorita', image: 'https://cdn.apis.cineplanet.com.pe/CDN/media/entity/get/FilmPosterGraphic/HO00002203?referenceScheme=HeadOffice&allowPlaceHolder=true' },
    { title: 'Masacre en Texas', image: 'https://cdn.apis.cineplanet.com.pe/CDN/media/entity/get/FilmPosterGraphic/HO00002187?referenceScheme=HeadOffice&allowPlaceHolder=true' },
    { title: 'Policías', image: 'https://cdn.apis.cineplanet.com.pe/CDN/media/entity/get/FilmPosterGraphic/HO00002008?referenceScheme=HeadOffice&allowPlaceHolder=true' },
   
  ];

}
