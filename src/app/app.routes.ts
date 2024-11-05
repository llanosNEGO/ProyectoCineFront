import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './module/AuthModule/login/login.component';
import { RegisterComponent } from './module/AuthModule/register/register.component';
import { NgModule } from '@angular/core';
import { ReservationComponent } from './module/ReservationModule/Main-Page/reservation/reservation.component';
import { PaymentComponent } from './module/ReservationModule/Sub-Component/payment/payment.component';
import { SeatSelectionComponent } from './module/ReservationModule/Sub-Component/seat-selection/seat-selection.component';

export const routes: Routes = [
    { path: '', redirectTo: "/", pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {path: 'reservation', component: ReservationComponent},
    {path: 'payment', component: PaymentComponent},
    {path: 'seat', component: SeatSelectionComponent},
    

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
