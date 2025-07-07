import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NgIf } from '@angular/common';
import { DulceriaApiService } from '../data-access/dulceria-api.service';

@Component({
  selector: 'app-dulceria-create',
  templateUrl: './dulceria-create.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  styleUrls: ['./dulceria-create.component.css']
})
export class DulceriaCreateComponent implements OnInit {
  dulceriaForm: FormGroup;
  message: string = '';
  isError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dulceriaService: DulceriaApiService,
    private router: Router
  ) {
    this.dulceriaForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['',[Validators.required]],
      cost: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      urlImage: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.dulceriaForm.invalid) {
      this.markAllAsTouched();
      this.message = 'Por favor, complete todos los campos requeridos correctamente.';
      this.isError = true;
      return;
    }

    const dulceriaData = {
      ...this.dulceriaForm.value
    };

    this.dulceriaService.createDulceria(dulceriaData).subscribe({
      next: (response) => {
        this.message = 'Producto de dulcería creado con éxito!';
        this.isError = false;
        setTimeout(() => {
          this.router.navigate(['/dulceriaAdmin']);
        }, 2000);
      },
      error: (err) => {
        this.message = 'Error al crear el producto: ' + (err.error?.message || err.message);
        this.isError = true;
        console.error('Error completo:', err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/Admin/dulceriaAdmin']);
  }

  private markAllAsTouched(): void {
    Object.values(this.dulceriaForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  get title() { return this.dulceriaForm.get('title'); }
  get cost() { return this.dulceriaForm.get('cost'); }
  get description () {return this.dulceriaForm.get('description')}
  get category() { return this.dulceriaForm.get('category'); }
  get urlImage() { return this.dulceriaForm.get('urlImage'); }
}