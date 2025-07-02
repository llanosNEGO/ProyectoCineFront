import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { hasEmailError, isRequired } from '../utils/validators';
import { AuthUserService } from '../data-access/auth-user.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

interface FormSignUp {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  name: FormControl<string | null>;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private _formBuilder = inject(FormBuilder);
  //Inyectamos nuestro servicio
  private _authService = inject(AuthUserService);
  //agregamos las rutas una vez que se registre
  private _router = inject(Router);

  isRequired(field: 'email' | 'password' | 'name') {
    return isRequired(field, this.form);
  }

  hasEmailError() {
    return hasEmailError(this.form);
  }

  form = this._formBuilder.group<FormSignUp>({
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this._formBuilder.control('', Validators.required),
    name: this._formBuilder.control('', Validators.required),
  });

  // async submit() {
  //   if (this.form.invalid) return;
  
  //   try {
  //     const { email, password, name } = this.form.value;
  
  //     if (!email || !password || !name) return;
  
  //     // Intenta registrar al usuario
  //     await this._authService.registerUser({ email, password });
  
  //     // Si el registro es exitoso, muestra el mensaje y redirige
  //     toast.success('Usuario creado correctamente');
  //     //this._router.navigateByUrl('/movieList');
  //   } catch (error: any) {
  //     // Si el error es que el email ya está en uso, muestra el mensaje de error y no redirige
  //     if (error.code === 'auth/email-already-in-use') {
  //       toast.error('El correo electrónico ya está registrado. Intenta iniciar sesión o usa otro correo.');
  //     } else {
  //       // Para otros errores, muestra un mensaje de error general
  //       toast.error('Ocurrió un error inesperado. Inténtalo nuevamente.');
  //     }
  //   }
  // }
  
  

  /*async submitWithGoogle() {
    try {
      await this._authService.signInWithGoogle();
      toast.success('Bienvenido denuevo');
      this._router.navigateByUrl('/tasks');
    } catch (error) {
      toast.error('Ocurrio un error');
    }
  }*/
}
