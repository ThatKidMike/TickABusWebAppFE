import { AlertifyService } from './_services/alertify.service';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AuthService } from './_services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_routerGuards/auth.guard';
import { TrackDataService } from './_services/trackData.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TrackComponent } from './track/track.component';
import { TicketsComponent } from './tickets/tickets.component';
import { PaymentComponent } from './payment/payment.component';
import { appRoutes } from './routes';
import { HomeComponent } from './home/home.component';
import { PaymentCompletedComponent } from './payment-completed/payment-completed.component';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      SidenavComponent,
      TrackComponent,
      TicketsComponent,
      PaymentComponent,
      HomeComponent,
      PaymentCompletedComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
         config: {
            tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/auth/']
         }
      }),
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      AuthGuard,
      TrackDataService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
