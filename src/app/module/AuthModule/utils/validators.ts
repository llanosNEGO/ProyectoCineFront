import { FormGroup } from '@angular/forms';

export const isRequired = (field: 'email' | 'password' |'name', form: FormGroup) => {
  //Esta línea obtiene el control del formulario correspondiente al campo especificado
  const control = form.get(field);

  //Verificar que el control exista
  //control.touched verifica que el control a sido tocado
  //control.hasError('required') Verifica que el control tenga un error de tipo 'required'
  return control && control.touched && control.hasError('required');
};

//Esta función se utiliza para verificar si un campo específico en un formulario es requerido y si tiene un error de validación
export const hasEmailError = (form: FormGroup) => {
  const control = form.get('email');
  return control && control?.touched && control.hasError('email');
};
