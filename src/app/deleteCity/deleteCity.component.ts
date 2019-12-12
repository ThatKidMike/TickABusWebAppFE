import { CitiesService } from './../_services/cities.service';
import { AlertifyService } from './../_services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-deleteCity',
  templateUrl: './deleteCity.component.html',
  styleUrls: ['./deleteCity.component.css']
})
export class DeleteCityComponent implements OnInit {
  selectedCity: any;
  cities: any;

  constructor(private authService: AuthService, private http: HttpClient, private alertify: AlertifyService,
              private citiesService: CitiesService) { }

  ngOnInit() {
    this.getCities();
    document.getElementById('deleteBtn').addEventListener('click', this.deleteCity.bind(this), true);
  }

  getCities() {
    this.citiesService.getCities().subscribe(response => {
      this.cities = response;
    }, error => {
      console.log(error);
    });
  }

  deleteCity() {
    this.citiesService.deleteCity(this.selectedCity.id).subscribe(response => {
      console.log(response);
      this.getCities();
      this.alertify.success('City deleted');
    }, error => {
      console.log(error);
      this.alertify.error('Deletion error - check if city is not embedded in tracks');
    });

  }

}
