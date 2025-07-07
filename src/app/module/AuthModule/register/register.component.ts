import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthUserService } from '../data-access/auth-user.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthUserService);
  private router = inject(Router);

  registerForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(4),
    ]],
    confirmPassword: ['', Validators.required]
  }, { 
    validators: this.passwordMatchValidator 
  });

  // Validador para coincidencia de contraseñas
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value 
      ? null 
      : { mismatch: true };
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    console.log('Formulario enviado'); 
    if (this.registerForm.invalid) {
      this.markAllAsTouched();
      toast.error('Por favor, complete todos los campos correctamente');
      return;
    }

    const { email, username, password } = this.registerForm.value;

    this.authService.register({ 
      email, 
      username, 
      password,
      role: 'USER' 
    }).subscribe({
      next: () => {
        toast.success('¡Registro exitoso! Por favor inicie sesión');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error en registro:', err);
        toast.error(err.error?.message || 'Error en el registro. Intente nuevamente.');
      }
    });
  }

  private markAllAsTouched() {
    Object.values(this.registerForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}