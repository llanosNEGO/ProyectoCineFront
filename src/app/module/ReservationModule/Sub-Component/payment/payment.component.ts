import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ReservationService } from '../../reservation.service';
import { Payment } from '../../../../models/Payment';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './payment.component.html',
  styles: ``,
})
export class PaymentComponent {
  /**********************************Nuevo************************************* */
  paymentForm: FormGroup;
  selectedSeats: string[] = [];
  totalAmount: number = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private reservationService: ReservationService
  ) {
    const reservationDetails = this.reservationService.getReservationDetails();
    this.selectedSeats = reservationDetails.selectedSeats || [];
    this.totalAmount = this.selectedSeats.length * 10; // Precio por asiento

    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{4} \d{4} \d{4} \d{4}$/)]],
      cardHolder: ['', Validators.required],
      expiryDate: ['', [Validators.required, Validators.pattern(/^\d{2}\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
    });
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      // Verificar valor del formulario
      console.log('Formulario válido:', this.paymentForm.value);
  
      const payment: Payment = {
        cardNumber: this.paymentForm.value.cardNumber,
        cardHolder: this.paymentForm.value.cardHolder,
        expiryDate: this.paymentForm.value.expiryDate,
        cvv: this.paymentForm.value.cvv,
        totalAmount: this.totalAmount
      };
  
      // Verificar objeto `payment`
      console.log('Objeto de pago:', payment);
  
      // Guardar detalles de pago y realizar otras acciones
      this.reservationService.setPaymentDetails(payment);
      this.saveReservation();

      alert('¡Pago procesado con éxito!');
      this.reservationService.printData();
      //this.reservationService.clearReservation();
      this.router.navigate(['/confirmation']);
    } else {
      alert('Por favor complete todos los campos correctamente.');
    }
  }


  //metodo para guarda la data en firebase
  async saveReservation() {
    try {
      const reservationId = await this.reservationService.saveReservation();
      console.log('Reservación guardada con éxito:', reservationId);
      // Aquí podrías navegar a una página de confirmación
    } catch (error) {
      console.error('Error al guardar:', error);
      // Manejo de errores
    }
  }
  

  goBack() {
    this.router.navigate(['/seat-selection']);
  }



  get f() {
    return this.paymentForm.controls;
  }

  //formate la separacion de espacios de 4 en 4 
  formatCardNumber() {
    const rawValue = this.f['cardNumber'].value.replace(/\s/g, '');
    const formattedValue = rawValue.replace(/(\d{4})/g, '$1 ').trim();
    this.paymentForm.patchValue({ cardNumber: formattedValue });
  }
}
