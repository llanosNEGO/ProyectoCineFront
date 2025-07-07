import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promociones-list',
  standalone: true,
  imports: [],
  templateUrl: './promociones-list.component.html',
  styleUrl: './promociones-list.component.css'
})
export class PromocionesListComponent {

  constructor( private router : Router){}
  login(): void {
    this.router.navigate(['/login']);
  }

}
