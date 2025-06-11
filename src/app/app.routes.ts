import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './module/AuthModule/login/login.component';
import { RegisterComponent } from './module/AuthModule/register/register.component';
import { NgModule } from '@angular/core';
import { ReservationComponent } from './module/ReservationModule/Main-Page/reservation/reservation.component';
import { PaymentComponent } from './module/ReservationModule/Sub-Component/payment/payment.component';
import { SeatSelectionComponent } from './module/ReservationModule/Sub-Component/seat-selection/seat-selection.component';
import { MovieListComponent } from './module/MovieModule/movie-list/movie-list.component';
import { MovieDetailComponent } from './module/MovieModule/movie-detail/movie-detail.component';
import { CinemaListComponent } from './module/CinemasModule/cinema-list/cinema-list.component';
import { DulceriaListComponent } from './module/DulceriaModule/dulceria-list/dulceria-list.component';
import { SeatMapComponent } from './module/ReservationModule/Sub-Component/seat-map/seat-map.component';
import { HomeComponent } from './module/home/home.component';
import { PanelComponent } from './module/PanelModule/panel/panel.component';
import { TrabajaComponent } from './module/TrabajaModule/Main-Page/trabaja/trabaja.component';
import { SocioComponent } from './module/SocioModule/Main-Page/socio/socio.component';
import { CorporacionComponent } from './module/ComporacionModule/Main-Page/corporacion/corporacion.component';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige a home por defecto
    { path: 'login', component: LoginComponent },
    {path: 'reservation', component: ReservationComponent},
    {path: 'payment', component: PaymentComponent},
    {path: 'seat', component: SeatSelectionComponent},
    {path: 'register', component:RegisterComponent},
    {path: 'movieList', component:MovieListComponent},
    { path: 'movie/:id', component: MovieDetailComponent },
    { path: 'reservation/:id', component: ReservationComponent },
    { path: 'evaluacion', component: TrabajaComponent},
    {path: 'socio', component: SocioComponent},
    {path: 'corporativo', component: CorporacionComponent},

    //Cinemas
    {path: 'cinemasList', component:CinemaListComponent},

    //Dulceria
    {path: 'dulceriaList', component:DulceriaListComponent},


    //movieList: Normal
    { path: 'seat-selection', component: SeatMapComponent },


    //navegacion pagina a home
    { path: 'home', component:HomeComponent },

    //Panel de control de reservas
    { path: 'panel', component:PanelComponent },



    // Redirige a la página por defecto si la ruta no existe
    { path: '**', redirectTo: '' } ,


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
