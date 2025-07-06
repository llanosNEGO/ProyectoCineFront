import { Component} from '@angular/core';
import { CinemaApiService } from '../data-access/cinema-api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Cine } from '../../../models/Cine';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cinema-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgIf],
  templateUrl: './cinema-create.component.html',
  styleUrl: './cinema-create.component.css',
})
export class CinemaCreateComponent {
  cinemaForm: FormGroup;
  message: string = '';
  isError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private cinemaService: CinemaApiService,
    private router: Router
  ) {
    this.cinemaForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      urlImage: ['', [Validators.required ]],
      horarios: [[]],
      disponible: [[]],
      rooms: [[]]
    });
  }

  onSubmit(): void {
    if (this.cinemaForm.invalid) {
      this.markAllAsTouched();
      this.message = 'Por favor complete todos los campos';
      this.isError = true;
      return;
    }

    const cinemaData: Cine = {
      ...this.cinemaForm.value
    };

    this.cinemaService.createCinema(cinemaData).subscribe({
      next: (response) => {
        this.message = 'Cinema creado con exito!';
        this.isError = false;
        setTimeout(() => {
          this.router.navigate(['/Admin/cinemaAdmin']);
        }, 2000);
      },
      error: (err) => {
        this.message = 'Error creando Cinema: ' + (err.error?.message || err.message);
        this.isError = true;
        console.error('Full error:', err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/Admin/cinemaAdmin']);
  }

  private markAllAsTouched(): void {
    Object.values(this.cinemaForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  // Form control getters for template validation
  get name() { return this.cinemaForm.get('name'); }
  get description() { return this.cinemaForm.get('description'); }
  get address() { return this.cinemaForm.get('address'); }
  get urlImage() { return this.cinemaForm.get('urlImage'); }

}