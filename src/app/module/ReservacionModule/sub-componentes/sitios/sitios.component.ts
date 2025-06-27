import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SeatStatus } from '../../../../models/Rooms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sitios',
  standalone: true,
  imports: [NgClass],
  templateUrl: './sitios.component.html',
  styleUrls: ['./sitios.component.css']
})
export class SitiosComponent {
  @Input() id: string = '';
  @Input() status: SeatStatus = 'available';
  @Output() select = new EventEmitter<string>();

  get seatClass(): string {
    const baseClass = 'seat w-8 h-8 rounded flex items-center justify-center text-xs font-medium cursor-pointer transition-all ';
    
    switch (this.status) {
      case 'available':
        return baseClass + 'bg-gray-200 hover:bg-gray-300 text-gray-800';
      case 'selected':
        return baseClass + 'bg-blue-600 text-white';
      case 'occupied':
        return baseClass + 'bg-gray-400 cursor-not-allowed';
      case 'wheelchair':
        return baseClass + 'bg-green-200 hover:bg-green-300 text-green-800';
      default:
        return baseClass + 'bg-gray-200';
    }
  }

  get icon(): string {
    return this.status === 'wheelchair' ? '♿' : '';
  }

  handleClick(): void {
    if (this.status === 'available' || this.status === 'wheelchair') {
      this.select.emit(this.id);
    }
  }
}