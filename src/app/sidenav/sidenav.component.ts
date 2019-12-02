import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(
      next => { this.alertify.success('Logged in successfully'); },
      error => { this.alertify.error(error); }
      );
  }

  register() {
    this.authService.register(this.model).subscribe(
      next => { this.alertify.success('Registered successfully'); this.login(); },
      error => { this.alertify.error(error); }
    );
  }

  loggedIn() {
    return this.authService.loggedIn(); 
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('Logged out');
  }

}
