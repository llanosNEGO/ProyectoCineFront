import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { hasEmailError, isRequired } from '../utils/validators';
import { AuthUserService } from '../data-access/auth-user.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';


interface FormSignUp {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  name:FormControl<string| null>;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private _formBuilder = inject(FormBuilder);
  //Inyectamos nuestro servicio
  private _authService = inject(AuthUserService);
  //agregamos las rutas una vez que se registre
  private _router = inject(Router);

  isRequired(field: 'email' | 'password' |'name') {
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
    name:this._formBuilder.control('',Validators.required)
  });

  async submit() {
    if (this.form.invalid) return;

    try {
      const { email, password,name } = this.form.value;

      if (!email || !password || !name) return;

      //creamos nuestro objeto
      this._authService.registerUser({email,password})  //esto es una promesa


      toast.success('Usuario creado correctamente');
      //alert("Usuario creado correctamente")
      this._router.navigateByUrl('/reservation');

      
    } catch (error) {
      toast.error('Ocurrio un error');
      //alert("Ocurrio un error")
    }
  }

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
