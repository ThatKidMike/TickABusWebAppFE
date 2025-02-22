import { CitiesService } from './../_services/cities.service';
import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modifyCity',
  templateUrl: './modifyCity.component.html',
  styleUrls: ['./modifyCity.component.css']
})
export class ModifyCityComponent implements OnInit {

  actualCityName: any;
  selectedCity: any;
  cities: any;
  city: any;
  cityDTO: any = {};

  constructor(private authService: AuthService, private http: HttpClient, private alertify: AlertifyService,
              private citiesService: CitiesService) { }

  ngOnInit() {
    this.getCities();
    document.getElementById('submitBtn').addEventListener('click', this.modifyCity.bind(this), true);
  }

  getCities() {
    this.citiesService.getCities().subscribe(response => {
      this.cities = response;
    }, error => {
      console.log(error);
    });
  }

  modifyCity() {
    if (this.actualCityName !== null && this.selectedCity !== undefined) {
      this.cityDTO.name = this.actualCityName;
      this.citiesService.modifyCity(this.selectedCity.id, this.cityDTO).subscribe(response => {
        console.log(response);
        this.alertify.success('City was modified');
        this.getCities();
      }, error => {
       console.log(error);
       this.alertify.error('Something went wrong with modyfing');
      });
  }
  }

  provideCity() {
    this.actualCityName = this.selectedCity.name;
  }

}
