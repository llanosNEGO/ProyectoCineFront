import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cinema-card',
  standalone: true,
  imports: [],
  templateUrl: './cinema-card.component.html',
})
export class CinemaCardComponent {
  @Input() image: string = '';
  @Input() title: string = '';
  @Input() address: string = '';
  @Input() formats: string[] = [];

}
