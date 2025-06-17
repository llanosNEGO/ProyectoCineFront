import { Component } from '@angular/core';
import { CinemaCardComponent } from "../../../shared/iu/cinema-card/cinema-card.component";
import { Cine } from '../../../models/Cine';
import { CinemaApiService } from '../data-access/cinema-api.service';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { Cinemas } from '../../../models/Cinemas';

@Component({
  selector: 'app-cinema-list',
  standalone: true,
  imports: [CinemaCardComponent,NgFor],
  templateUrl: './cinema-list.component.html',
  styles: ``
})
export class CinemaListComponent {
  cine: Cinemas[] = [];


  /***************************MockApi******************************/
  constructor(private cineService: CinemaApiService,private router:Router) {}

  ngOnInit(): void {
    this.cineService.getAllCinemas().subscribe((data: Cinemas[]) => {
      this.cine = data;
    });
  }

  viewDetails(id: number): void {
    this.router.navigate(['/cinema', id]);
  }

}
