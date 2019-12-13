import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  model: any = {};
  toggleBtn: any;

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(
      next => { this.alertify.success('Logged in successfully'); },
      error => { this.alertify.error('Wrong username or password'); },
      () => {
        this.router.navigate(['tracks']);
      }
      );
  }

  register() {
    this.authService.register(this.model).subscribe(
      next => { this.alertify.success('Registered successfully'); this.login(); },
      error => { this.alertify.error(`${error}`); }
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('Logged out');
    this.router.navigate(['home']);
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

}
