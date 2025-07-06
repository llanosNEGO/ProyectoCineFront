import { Component, OnInit } from '@angular/core';

import { Cine } from '../../../models/Cine';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CinemaApiService } from '../data-access/cinema-api.service';

@Component({
  selector: 'app-cinema-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cinema-edit.component.html',
  styleUrl: './cinema-edit.component.css'
})
export class CinemaEditComponent implements OnInit {
  cinemaForm: FormGroup;
  cinemaId: number = 0;
  isLoading = true;
  isEditing = false;

  constructor(
    private cinemaService: CinemaApiService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.cinemaForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      urlImage: ['', [Validators.required, Validators.pattern('https?://.+')]],
      horarios: [[]],
      disponible: [[]],
      rooms: [[]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cinemaId = +params['id'];
      if (this.cinemaId) {
        this.loadCinema(this.cinemaId);
      } else {
        this.isLoading = false;
        this.isEditing = true;
      }
    });
  }

  loadCinema(id: number): void {
    this.cinemaService.getCinemaById(id).subscribe({
      next: (cine) => {
        this.cinemaForm.patchValue({
          name: cine.name,
          description: cine.description,
          address: cine.address,
          urlImage: cine.urlImage,
          horarios: cine.horarios,
          disponible: cine.disponible,
          rooms: cine.rooms
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading cinema', err);
        this.isLoading = false;
      }
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing && this.cinemaId) {
      this.loadCinema(this.cinemaId);
    }
  }

  addSchedule(): void {
    const scheduleControl = this.cinemaForm.get('horarios');
    const newSchedule = this.fb.control('', Validators.required);
    if (scheduleControl) {
      const currentSchedules = scheduleControl.value as string[];
      scheduleControl.setValue([...currentSchedules, newSchedule.value]);
    }
  }

  removeSchedule(index: number): void {
    const scheduleControl = this.cinemaForm.get('horarios');
    if (scheduleControl) {
      const currentSchedules = scheduleControl.value as string[];
      currentSchedules.splice(index, 1);
      scheduleControl.setValue([...currentSchedules]);
    }
  }
  onCancel(): void {
    this.router.navigate(['/Admin/cinemaAdmin']);
  }

  addAvailability(): void {
    const availabilityControl = this.cinemaForm.get('disponible');
    const newAvailability = this.fb.control('', Validators.required);
    if (availabilityControl) {
      const currentAvailability = availabilityControl.value as string[];
      availabilityControl.setValue([...currentAvailability, newAvailability.value]);
    }
  }

  removeAvailability(index: number): void {
    const availabilityControl = this.cinemaForm.get('disponible');
    if (availabilityControl) {
      const currentAvailability = availabilityControl.value as string[];
      currentAvailability.splice(index, 1);
      availabilityControl.setValue([...currentAvailability]);
    }
  }

  onSubmit(): void {
    if (this.cinemaForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    const cinemaData = this.cinemaForm.value as Cine;
    
    if (this.cinemaId) {
      this.cinemaService.updateCinema(this.cinemaId, cinemaData).subscribe({
        next: () => {
          this.router.navigate(['/Admin/cinemaAdmin']);
        },
        error: (err) => {
          console.error('Error updating cinema', err);
        }
      });
    } else {
      this.cinemaService.createCinema(cinemaData).subscribe({
        next: () => {
          this.router.navigate(['/Admin/cinemaAdmin']);
        },
        error: (err) => {
          console.error('Error creating cinema', err);
        }
      });
    }
  }

  private markAllAsTouched(): void {
    Object.values(this.cinemaForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  get name() { return this.cinemaForm.get('name'); }
  get description() { return this.cinemaForm.get('description'); }
  get address() { return this.cinemaForm.get('address'); }
  get urlImage() { return this.cinemaForm.get('urlImage'); }
}