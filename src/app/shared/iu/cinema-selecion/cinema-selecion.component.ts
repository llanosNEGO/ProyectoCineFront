import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cinema-selecion',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './cinema-selecion.component.html',
})
export class CinemaSelecionComponent {
  
  isExpanded: boolean = false;

  @Input() nameCinema!: string;
  @Input() formats: string[] = [];
  @Input() horarios: string[] = [];
  @Output() timeSelected = new EventEmitter<{ format: string; time: string }>();

  onTimeClick(format: string, time: string) {
    this.timeSelected.emit({ format, time });
  }
}

