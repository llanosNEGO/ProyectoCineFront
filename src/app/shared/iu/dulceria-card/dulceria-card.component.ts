import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dulceria-card',
  standalone: true,
  imports: [NgFor],
  templateUrl: './dulceria-card.component.html',
  styles: ``
})
export class DulceriaCardComponent {
  @Input() image: string = '';
  @Input() title: string = '';
  @Input() description: string[] = [];
  @Input() price: number=0;
}
