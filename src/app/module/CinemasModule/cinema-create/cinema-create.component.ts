import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CinemaApiService } from '../data-access/cinema-api.service';
import { FormBuilder,  FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cinemas } from '../../../models/Cinemas';
import { Cities } from '../../../models/City';
import { CommonModule, NgFor } from '@angular/common';


@Component({
  selector: 'app-cinema-create',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, CommonModule],
  providers: [CinemaApiService],
  templateUrl: './cinema-create.component.html',
  styleUrl: './cinema-create.component.css',
})
export class CinemaCreateComponent {
  @Input() cinema: Cinemas | null = null;
  @Input() cities: Cities[] = [];
  @Output() submitForm = new EventEmitter<Partial<Cinemas>>();

  cinemaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.cinemaForm = this.fb.group({
      nameCinema: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      address: ['', [Validators.required, Validators.maxLength(200)]],
      urlImage: ['', [Validators.maxLength(500)]],
      city: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.cinema) {
      this.cinemaForm.patchValue({
        nameCinema: this.cinema.nameCinema,
        description: this.cinema.description,
        address: this.cinema.address,
        city: this.cinema.city
      });
    }
  }

  onSubmit(): void {
    if (this.cinemaForm.valid) {
      this.submitForm.emit(this.cinemaForm.value);
    }
  }
}