import { DeleteTrackComponent } from './deleteTrack/deleteTrack.component';
import { ModifyTrackComponent } from './modifyTrack/modifyTrack.component';
import { DeleteCityComponent } from './deleteCity/deleteCity.component';
import { ModifyCityComponent } from './modifyCity/modifyCity.component';
import { AddCityComponent } from './addCity/addCity.component';
import { PaymentCompletedComponent } from './payment-completed/payment-completed.component';
import { HomeComponent } from './home/home.component';
import { TrackComponent } from './track/track.component';
import { Routes, CanActivate } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';
import { TicketsComponent } from './tickets/tickets.component';
import { AuthGuard } from './_routerGuards/auth.guard';
import { RoleGuard } from './_routerGuards/role.guard';
import { AddTrackComponent } from './addTrack/addTrack.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'tracks', component: TrackComponent, canActivate: [AuthGuard]},
    { path: 'tickets', component: TicketsComponent, canActivate: [RoleGuard] },
    { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
    { path: 'payment-completed', component: PaymentCompletedComponent, canActivate: [AuthGuard] },
    { path: 'addcity', component: AddCityComponent},
    { path: 'modifycity', component: ModifyCityComponent},
    { path: 'deletecity', component: DeleteCityComponent},
    { path: 'addtrack', component: AddTrackComponent},
    { path: 'modifytrack', component: ModifyTrackComponent},
    { path: 'deletetrack', component: DeleteTrackComponent},
    { path: '**', redirectTo: 'tracks', pathMatch: 'full'}
];
