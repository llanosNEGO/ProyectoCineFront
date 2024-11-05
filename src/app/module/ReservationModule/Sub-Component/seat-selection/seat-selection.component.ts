import {Component, EventEmitter, Input, Output} from '@angular/core';
import { NgClass, NgFor } from '@angular/common';


@Component({
  selector: 'app-seat-selection',
  standalone: true,
  imports: [NgFor,NgClass],
  templateUrl: './seat-selection.component.html',
  styleUrl: './seat-selection.component.css',
})
export class SeatSelectionComponent {

  /***********************Nuevo forma*************************/
  @Input() id: string = '';
  @Input() status: 'available' | 'occupied' | 'selected' | 'wheelchair' = 'available';
  @Output() select = new EventEmitter<string>();

  getStatusColor(): string {
    return this.status;
  }

 handleSelect(): void {
    if (this.status === 'available') {
      this.select.emit(this.id);
    }
  }

  
  
  
  
  /*@ViewChild('seatsCanvas') seatsCanvas!: ElementRef<HTMLCanvasElement>;
  private context!: CanvasRenderingContext2D;

  movie: Movie = {
    title: 'The Matrix',
    image: 'https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg',
    format: ['2D', '3D'],
    cinema: 'Cinema 1',
    date: '2021-04-15',
    hours: '15:00',
    room: 'Room 1',
  };

  timer: string = '04:46';

  seats: Seat[] = [];

  cinema: Cinema = {
    name: 'Cinema Lima',
    capacity: 30,
    rowLetters: ['A', 'B', 'C', 'D'],
    rowCount: 4,
  };

  constructor(private router: Router) {
    this.initializeSeats();
  }

  ngAfterViewInit() {
    this.context = this.seatsCanvas.nativeElement.getContext('2d')!;
    this.drawSeats();
  }

  initializeSeats() {
    const rows = this.cinema.rowLetters;
    const columns = Math.ceil(this.cinema.capacity / this.cinema.rowCount);

    rows.forEach(row => {
      for (let i = 1; i <= columns; i++) {
        if (this.seats.length >= this.cinema.capacity) break;
        const status = Math.random() < 0.1 ? 'occupied' : 'available';
        this.seats.push({
          id: `${row}${i}`,
          row,
          number: i,
          status: row === 'A' && (i === 4 || i === 5) ? 'wheelchair' : status,
          x: i * 40,
          y: rows.indexOf(row) * 40
        });
      }
    });
  }

  drawSeats() {
    this.context.clearRect(
      0,
      0,
      this.seatsCanvas.nativeElement.width,
      this.seatsCanvas.nativeElement.height
    );

    this.seats.forEach((seat) => {
      this.context.beginPath();
      this.context.arc(seat.x, seat.y, 10, 0, Math.PI * 2);

      if (seat.status === 'available') this.context.fillStyle = 'gray';
      if (seat.status === 'occupied') this.context.fillStyle = 'red';
      if (seat.status === 'selected') this.context.fillStyle = 'blue';

      this.context.fill();
      this.context.closePath();
    });
  }

  toggleSeat(seat: Seat) {
    if (seat.status === 'available') {
      seat.status = 'selected';
    } else if (seat.status === 'selected') {
      seat.status = 'available';
    }
    this.drawSeats();
  }

  onCanvasClick(event: MouseEvent) {
    const rect = this.seatsCanvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.seats.forEach((seat) => {
      const distance = Math.sqrt((x - seat.x) ** 2 + (y - seat.y) ** 2);
      if (distance < 15 && seat.status !== 'occupied') {
        this.toggleSeat(seat);
      }
    });
  }

  getSelectedSeats(): Seat[] {
    return this.seats.filter((seat) => seat.status === 'selected');
  }

  continue() {
    const selectedSeats = this.getSelectedSeats();
    console.log('Continuing with selected seats:', selectedSeats);
    this.router.navigate(['/payment']); // Replace '/next-component' with the actual route
  }*/
}
