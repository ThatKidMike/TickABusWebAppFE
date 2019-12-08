import { AuthService } from './../_services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private AuthService: AuthService, private router: Router,
              private alertify: AlertifyService) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.AuthService.loggedIn() && this.AuthService.role === 'user') {
      return true;
    }

    if (!this.AuthService.loggedIn()) {
        this.alertify.error('User has to be logged in');
    } else {
        this.alertify.error('Tickets module for users only');
    }

    this.router.navigate(['home']);
    return false;
  }

}
