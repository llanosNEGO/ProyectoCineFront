import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Dulceria } from '../../../models/Dulceria';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DulceriaApiService } from '../data-access/dulceria-api.service';

@Component({
  selector: 'app-dulceria-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dulceria-edit.component.html'
})
export class DulceriaEditComponent implements OnInit {
  editform: FormGroup;
  isError: boolean = false;
  id: number | null = null;
  message: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dulceriaService: DulceriaApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editform = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      description: ['', Validators.required],
      cost: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      urlImage: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.id = +id;
      this.isLoading = true;
      this.dulceriaService.getDulceriaById(this.id).subscribe({
        next: (dulceria) => {
          this.editform.patchValue({
            ...dulceria,
            description: dulceria.description.join('\n')
          });
          this.isLoading = false;
        },
        error: () => {
          this.showMessage('Error al cargar la dulcería', true);
          this.isLoading = false;
        }
      });
    }
  }

  onSubmit(): void {
    if (this.editform.invalid) {
      this.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const dulceria: Dulceria = {
      id: this.id || 0,
      ...this.editform.value,
      description: this.editform.value.description.split('\n')
    };

    const operation = this.id
      ? this.dulceriaService.updateDulceria(this.id, dulceria)
      : this.dulceriaService.createDulceria(dulceria);

    operation.subscribe({
      next: () => {
        this.showMessage(`Dulcería ${this.id ? 'actualizada' : 'creada'} correctamente`, false);
        setTimeout(() => this.router.navigate(['/Admin/dulceriaAdmin']), 1500);
      },
      error: () => {
        this.showMessage(`Error al ${this.id ? 'actualizar' : 'crear'} la dulcería`, true);
        this.isLoading = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/Admin/dulceriaAdmin']);
  }

  showMessage(msg: string, isError: boolean): void {
    this.message = msg;
    this.isError = isError;
  }

  markAllAsTouched(): void {
    Object.values(this.editform.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  // Getters para los controles del formulario
  get title() { return this.editform.get('title'); }
  get description() { return this.editform.get('description'); }
  get cost() { return this.editform.get('cost'); }
  get category() { return this.editform.get('category'); }
  get urlImage() { return this.editform.get('urlImage'); }
}