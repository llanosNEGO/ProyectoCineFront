import { Component, inject } from '@angular/core';
import { AuthUserService } from '../data-access/auth-user.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { toast } from 'ngx-sonner';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthUserService
  ) {
    this.form = this.fb.group({
      username : ['', Validators.required],
      password : ['', Validators.required]
    })
    
  }

  async submit() {
    if (this.form.invalid) {
      return;
    }

    const { username, password } = this.form.value;

    if (!username || !password) {
      toast.error('Por favor complete todos los campos correctamente.');
      return;
    }

    try {
      await this.authService.login( username, password ).subscribe({
        next: (response) => {
          console.log('Respuesta Recibida: ', response)
          toast.success('Inicio de sesión exitoso');
          if (this.authService.hasRole('ADMIN')) {
              this.router.navigateByUrl('/Admin');
          } 
          else if (this.authService.hasRole('DBA')) {
              this.router.navigateByUrl('/Admin');
            } 
          else {
              this.router.navigateByUrl('/home');
          }

        },
        error: (error) =>{
          if (error.status === 401) {
            toast.error('Credenciales inválidas. Verifique sus datos.');
          } else if (error.status === 404) {
            toast.error('Usuario no encontrado.');
          } else {
            toast.error('Ocurrió un error inesperado');
          }
          console.error(error);
        }
      });

    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        toast.error('Usuario no encontrado. Verifique sus credenciales.');
      } else if (error.code === 'auth/wrong-password') {
        toast.error('Contraseña incorrecta. Inténtelo de nuevo.');
      } else {
        toast.error('Ocurrió un error inesperado');
      }
      console.error(error);
    }
  }
}
