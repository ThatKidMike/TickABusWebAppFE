import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(
      next => { console.log('Logged in successfully'); },
      error => { console.log('Failed to login'); }
      );
  }

  register() {
    this.authService.register(this.model).subscribe(
      next => { console.log('Registered successfully'); },
      error => { console.log('Failed to register'); }
    );
  }

}
