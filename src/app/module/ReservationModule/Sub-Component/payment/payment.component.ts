import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './payment.component.html',
  styles: ``
})
export class PaymentComponent {
  /*********************************************************************** */
  selectedSeats: string[] = [];
  totalAmount: number = 0;
  paymentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initializing payment form with validators
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{4} \d{4} \d{4} \d{4}$/)]],
      cardHolder: ['', Validators.required],
      expiryDate: ['', [Validators.required, Validators.pattern(/^\d{2}\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
    });

    // Getting selected seats from route state
    const state = this.router.getCurrentNavigation()?.extras.state as { selectedSeats: string[] };
    this.selectedSeats = state?.selectedSeats || [];
    this.totalAmount = this.selectedSeats.length * 45; // 45 soles per seat
  }

  // Form field getter for easier access
  get f() {
    return this.paymentForm.controls;
  }

  // Format card number as 'xxxx xxxx xxxx xxxx'
  formatCardNumber() {
    const rawValue = this.f['cardNumber'].value.replace(/\s/g, '');
    const formattedValue = rawValue.replace(/(\d{4})/g, '$1 ').trim();
    this.paymentForm.patchValue({ cardNumber: formattedValue });
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      alert('¡Pago procesado con éxito!');
    } else {
      alert('Por favor complete todos los campos correctamente.');
    }
  }

  // Navigate back to seat selection
  goBack() {
    this.router.navigate(['/seat-selection']);
  }























  /*paymentForm: FormGroup;
  timer: string = '04:46';

  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      paymentMethod: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
      acceptPrivacy: [false, Validators.requiredTrue],
      acceptOptional: [false]
    });
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      console.log(this.paymentForm.value);
      // Aquí puedes agregar la lógica para procesar el pago
    } else {
      this.markFormGroupTouched(this.paymentForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }*/

}
