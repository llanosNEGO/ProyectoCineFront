import { Component } from '@angular/core';

import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cinema-detail',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './cinema-detail.component.html',
  styles: ``
})
export class CinemaDetailComponent {

  /*cine?: Cinemas;

  constructor(private cineService: CinemaApiService) {}

  ngOnInit(): void {
    this.cineService.obtenerCine().subscribe((data: Cinemas) => {
      this.cine = data;
    });
  }*/

}
