import { AlertifyService } from './../_services/alertify.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addTrack',
  templateUrl: './addTrack.component.html',
  styleUrls: ['./addTrack.component.css']
})
export class AddTrackComponent implements OnInit {
  cities: any;
  startingCity: any;
  destinationCity: any;
  date: any;
  hour: any;
  distance: any;
  trackAddDTO: any = {};

  constructor(private authService: AuthService, private http: HttpClient, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getCities();
    document.getElementById('proceedBtn').addEventListener('click', this.addTrack.bind(this), true);
  }

  getCities() {
    this.http.get('http://localhost:5000/cities/').subscribe(response => {
      this.cities = response;
    }, error => {
      console.log(error);
    });
  }

  addTrack() {
    if (this.startingCity === undefined || this.destinationCity === undefined || this.date === undefined
      || this.hour === undefined || this.distance === undefined) {
        this.alertify.error("Not all requried information was fullfiled");
      } else {
        this.trackAddDTO.StartingCityId = this.startingCity.id;
        this.trackAddDTO.DestinationCityId = this.destinationCity.id;
        this.trackAddDTO.Date = this.date + ' ' + this.hour;
        this.trackAddDTO.Distance = parseInt(this.distance, 10);
        console.log(this.trackAddDTO);
        this.http.post('http://localhost:5000/tracks/addtrack', this.trackAddDTO).subscribe(response => {
          console.log(response);
          this.alertify.success('Track was added');
        }, error => {
          console.log(error);
          this.alertify.error('Something went wrong while adding the track');
    });
      }

  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
