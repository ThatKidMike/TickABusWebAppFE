import { HomeComponent } from './home/home.component';
import { TrackComponent } from './track/track.component';
import { Routes, CanActivate } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';
import { TicketsComponent } from './tickets/tickets.component';
import { AuthGuard } from './_routerGuards/auth.guard';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'tracks', component: TrackComponent, canActivate: [AuthGuard]},
    { path: 'tickets', component: TicketsComponent, canActivate: [AuthGuard] },
    { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'tracks', pathMatch: 'full'}
];
