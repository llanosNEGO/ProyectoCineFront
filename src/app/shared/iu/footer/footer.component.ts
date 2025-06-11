import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faReadme } from '@fortawesome/free-brands-svg-icons';
import { 
  faFacebook, 
  faTwitter, 
  faInstagram, 
  faYoutube,
  faWhatsapp,
  faGooglePlay,
  faAppStore,
  
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  facebook = faFacebook;
  twitter = faTwitter;
  instagram = faInstagram;

  youtube = faYoutube;
  whatsapp = faWhatsapp;
  libro = faReadme;
  googlePlay = faGooglePlay;
  appStore = faAppStore
}
