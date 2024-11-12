import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { DulceriaCardComponent } from "../../../shared/iu/dulceria-card/dulceria-card.component";
import { Dulceria } from '../../../models/Dulceria';
import { Router } from '@angular/router';
import { DulceriaApiService } from '../data-access/dulceria-api.service';

@Component({
  selector: 'app-dulceria-list',
  standalone: true,
  imports: [NgFor, DulceriaCardComponent],
  templateUrl: './dulceria-list.component.html',
  styles: ``
})
export class DulceriaListComponent {
  tabs = ['PROMOCIONAL', 'COMBOS', 'CANCHITA/HD/NACHOS', 'BEBIDAS', 'GOLOSINAS'];
  activeTab = 'PROMOCIONAL';

  dulceria: Dulceria[]=[]

  constructor(private dulceriaService: DulceriaApiService, private router: Router) {}

  ngOnInit(): void {
    this.dulceriaService.getDulceria().subscribe((data: Dulceria[]) => {
      this.dulceria = data;
    });
  }

}
