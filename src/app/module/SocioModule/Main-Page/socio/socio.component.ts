import { Component } from '@angular/core';
import { SocioCardComponent } from '../../socio-card/socio-card.component';

@Component({
  selector: 'app-socio',
  standalone: true,
  imports: [SocioCardComponent],
  templateUrl: './socio.component.html',
  styleUrl: './socio.component.css'
})
export class SocioComponent {

}
