import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-modifyTrack',
  templateUrl: './modifyTrack.component.html',
  styleUrls: ['./modifyTrack.component.css']
})
export class ModifyTrackComponent implements OnInit {
  tracks: any;
  selectedTrack: any;
  selectedSCity: any;
  selectedDCity: any;
  date: any;
  hour: any;
  distance: any;
  sCity: any;
  dCity: any;
  cities: any;
  trackDTO: any = {};


  constructor(private authService: AuthService, private http: HttpClient, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getTracks();
    this.getCities();
    document.getElementById('submitBtn').addEventListener('click', this.modifyTrack.bind(this), true);
  }

  getTracks() {
    this.http.get('http://localhost:5000/tracks/noparams').subscribe(response => {
      this.tracks = response;
      this.getCityNames();
    }, error => {
      console.log(error);
    });
  }

  getCities() {
    this.http.get('http://localhost:5000/cities/').subscribe(response => {
      this.cities = response;
    }, error => {
      console.log(error);
    });
  }

  getCityNames() {
    this.tracks.forEach(track => {
     this.http.get(`http://localhost:5000/cities/${track.startingCityId}`).subscribe(response => {
        this.sCity = response;
        track.startingCityId = this.sCity.name;
      }, error => {
        console.log(error);
      });

     this.http.get(`http://localhost:5000/cities/${track.destinationCityId}`).subscribe(response => {
        this.dCity = response;
        track.destinationCityId = this.dCity.name;
      }, error => {
        console.log(error);
      });
    });
  }

  modifyTrack() {
    if (this.selectedTrack === undefined || this.selectedSCity === undefined 
      || this.selectedDCity === undefined || this.date === undefined || this.distance === undefined) {
        this.alertify.error('All must be provided - even if it is not a subject of change');
      } else {
        this.trackDTO.FakeDate = this.date + ' ' + this.hour;
        this.trackDTO.FakeStartingCityId = this.selectedSCity.id;
        this.trackDTO.FakeDestinationCityId = this.selectedDCity.id;
        this.trackDTO.Distance = parseInt(this.distance, 10);
        this.http.put(`http://localhost:5000/tracks/${this.selectedTrack.id}`, this.trackDTO).subscribe(response => {
          console.log(response);
          this.getTracks();
          this.alertify.success('Track was modified');
        }, error => {
          console.log(error);
          this.alertify.error('Something went wrong while modyfing track');
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
