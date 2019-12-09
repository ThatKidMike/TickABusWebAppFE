import { AlertifyService } from './../_services/alertify.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-addCity',
  templateUrl: './addCity.component.html',
  styleUrls: ['./addCity.component.css']
})
export class AddCityComponent implements OnInit {
  newCityName: any;
  cityDTO: any = {};

  constructor(private authService: AuthService, private http: HttpClient, private alertify: AlertifyService) { }

  ngOnInit() {
    document.getElementById('submitBtn').addEventListener('click', this.addCity.bind(this), true);
  }

  addCity() {
    this.cityDTO.name = this.newCityName;
    this.http.post('http://localhost:5000/cities/addcity', this.cityDTO).subscribe(response => {
      console.log(response);
      this.alertify.success('City was added');
    }, error => {
      console.log(error);
      this.alertify.error('Something went wrong while adding the city');
    });
  }

}
