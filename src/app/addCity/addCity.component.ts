import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addCity',
  templateUrl: './addCity.component.html',
  styleUrls: ['./addCity.component.css']
})
export class AddCityComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
