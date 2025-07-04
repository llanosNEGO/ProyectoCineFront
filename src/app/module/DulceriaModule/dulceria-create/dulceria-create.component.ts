import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DulceriaApiService } from '../data-access/dulceria-api.service';

import { Dulceria } from '../../../models/Dulceria';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dulceria-create',
  standalone: true,
  imports: [],
  templateUrl: './dulceria-create.component.html',
  styleUrl: './dulceria-create.component.css'
})
export class DulceriaCreateComponent implements OnInit{
  dulceriaForm : FormGroup;
  message : string = '';
  isError: boolean = false;

  constructor(
    private fb : FormBuilder,
    private dulceriaService : DulceriaApiService,
    private router : Router
  ){
    this.dulceriaForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      description : ['', [Validators.required]],
      cost: ['', [Validators.required]],
      category:['',[Validators.required]],
      urlImage:['', [Validators.required]]
    });
  }

  ngOnInit(): void {
      
  }

  onSubmit(): void {
    if(this.dulceriaForm.invalid){
      this.markAllAsTouched();
      this.message = 'Por favor, complete todos los campos requeridos correctamente.';
      this.isError = true;
      return;
    }


    const dulceriaData: Dulceria = {
      ...this.dulceriaForm.value,
      idDulceria: 0, // El backend probablemente asigna el ID
      id: '' // ID vacío para que lo asigne el backend
    };

    this.dulceriaService.createDulceria(dulceriaData).subscribe({
      next:(response) => {
        this.message = 'Dulceria creada con exito!';
        this.isError = false;
        setTimeout(() => {
          this.router.navigate(['/dulceriaCreate']);
        }, 2000);
      },
      error : (error) => {
        this.message ='Error al crear la Dulceria: '+ (error.error?.message || error.message);
        this.isError = true; 
      }
    });

  }

  onCancel(): void {
    this.router.navigate(['/dulceriaCreate']);
  }

  private markAllAsTouched(): void {
    Object.values(this.dulceriaForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  
    // id: string;
    // title: string;
    // description: string[];
    // cost: number;
    // category: string;
    // urlImage: string;
}
