import { Component } from '@angular/core';

import { NgFor, NgIf } from '@angular/common';
import { Cinemas } from '../../../models/Cinemas';
import { CinemaApiService } from '../data-access/cinema-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cinema-detail',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './cinema-detail.component.html',
  styles: ``
})
export class CinemaDetailComponent {

  cine?: Cinemas;

  constructor(private cineService: CinemaApiService,
    private route : ActivatedRoute
  ) {}

ngOnInit() {
  const id = this.route.snapshot.params['id']; // Si usas Angular Router
  this.cineService.getCinemaById(id).subscribe((data: Cinemas) => {
    this.cine = data;
  });
}

}
