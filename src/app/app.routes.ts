import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './module/AuthModule/login/login.component';
import { RegisterComponent } from './module/AuthModule/register/register.component';
import { NgModule } from '@angular/core'
import { MovieListComponent } from './module/MovieModule/movie-list/movie-list.component';
import { MovieDetailComponent } from './module/MovieModule/movie-detail/movie-detail.component';
import { CinemaListComponent } from './module/CinemasModule/cinema-list/cinema-list.component';
import { DulceriaListComponent } from './module/DulceriaModule/dulceria-list/dulceria-list.component';
import { HomeComponent } from './module/home/home.component';
import { TrabajaComponent } from './module/TrabajaModule/Main-Page/trabaja/trabaja.component';
import { SocioComponent } from './module/SocioModule/Main-Page/socio/socio.component';
import { ReservacionComponent } from './module/ReservacionModule/reservacion/reservacion.component';
import { PagosComponent } from './module/ReservacionModule/sub-componentes/pagos/pagos.component';
import { SelecionSitiosComponent } from './module/ReservacionModule/sub-componentes/selecion-sitios/selecion-sitios.component';
import { PromocionesListComponent } from './module/PromocionesModule/promociones-list/promociones-list.component';
import { CorporativoListComponent } from './module/CorporativoModule/corporativo-list/corporativo-list.component';
import { AdministracionPanelComponent } from './module/AdministracionModule/administracion-panel/administracion-panel.component';
import { CinemaCreateComponent } from './module/CinemasModule/cinema-create/cinema-create.component';
import { MovieCreateComponent } from './module/MovieModule/movie-create/movie-create.component';
import { PromocionesCreateComponent } from './module/PromocionesModule/promociones-create/promociones-create.component';
import { DulceriaCreateComponent } from './module/DulceriaModule/dulceria-create/dulceria-create.component';
import { MovieAdminComponent } from './module/MovieModule/movie-admin/movie-admin.component';
import { MovieEditComponent } from './module/MovieModule/movie-edit/movie-edit.component';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige a home por defecto
    { path: 'login', component: LoginComponent },
    {path: 'register', component:RegisterComponent},
    {path: 'movieLista', component:MovieListComponent},
    { path: 'movie/:id', component: MovieDetailComponent },
    { path: 'evaluacion', component: TrabajaComponent},
    {path: 'socio', component: SocioComponent},
    {path: 'corporativo', component: CorporativoListComponent},
    { path : 'reservacion/:id', component: ReservacionComponent},
    {path: 'reservacion' , component: ReservacionComponent},
    {path: 'pagos', component:PagosComponent},
    {path: 'seleccion-sitios', component: SelecionSitiosComponent},
    {path: 'promociones', component: PromocionesListComponent},
    {path: 'Admin', component:AdministracionPanelComponent,
        children:[
            {path: 'cinemaCrear',component:CinemaCreateComponent},
            {path: 'movieAdmin' ,component:MovieAdminComponent},
            {path: 'dulceriaCrear', component:DulceriaCreateComponent},
            {path: 'movieCreate', component: MovieCreateComponent},
            {path: 'movieEdit/:id', component: MovieEditComponent}
        ]
    },

    //Cinemas
    {path: 'cinemasList', component:CinemaListComponent},

    //Dulceria
    {path: 'dulceriaList', component:DulceriaListComponent},



    //navegacion pagina a home
    { path: 'home', component:HomeComponent },


    // Redirige a la página por defecto si la ruta no existe
    { path: '**', redirectTo: '' } ,


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
