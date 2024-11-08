import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './module/AuthModule/login/login.component';
import { RegisterComponent } from './module/AuthModule/register/register.component';
import { NgModule } from '@angular/core';
import { ReservationComponent } from './module/ReservationModule/Main-Page/reservation/reservation.component';
import { PaymentComponent } from './module/ReservationModule/Sub-Component/payment/payment.component';
import { SeatSelectionComponent } from './module/ReservationModule/Sub-Component/seat-selection/seat-selection.component';
import { MovieListComponent } from './module/CinemasModule/movie-list/movie-list.component';
import { MovieDetailComponent } from './module/CinemasModule/movie-detail/movie-detail.component';

export const routes: Routes = [
    { path: '', redirectTo: "/", pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {path: 'reservation', component: ReservationComponent},
    {path: 'payment', component: PaymentComponent},
    {path: 'seat', component: SeatSelectionComponent},
    {path: 'register', component:RegisterComponent},
    {path: 'movieList', component:MovieListComponent},
    { path: 'movie/:id', component: MovieDetailComponent },
    { path: 'reservation/:id', component: ReservationComponent },

    

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
