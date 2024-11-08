import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './movie-card.component.html',
})
export class MovieCardComponent {
  @Input() posterUrl: string = '';
  @Input() title: string = '';
  @Input() genre: string = '';
  @Input() duration: string = '';
}
