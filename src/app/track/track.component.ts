import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
  cities: any;
  tracks: any;
  startingCity: any;
  destinationCity: any;
  selectedTrack: any;
  dateParams: any;
  timeParams: any;

  constructor(private http: HttpClient, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.getCities();
    this.setCurrentDate();
  }

  getCities() {
    this.http.get('http://localhost:5000/cities/').subscribe(response => {
      this.cities = response;
      document.getElementById('proceedBtn').addEventListener('click', this.getTracks.bind(this), true);
    }, error => {
      console.log(error);
    });
  }

  setCurrentDate() {
    const currentDateAndTime = new Date();
    (document.getElementById('dateSetter') as HTMLInputElement).valueAsDate = currentDateAndTime;
    const timeStamp = currentDateAndTime.toString().split(':', 2);
    (document.getElementById('timeSetter') as HTMLInputElement).value
    = timeStamp[0].substring(timeStamp[0].length - 2, timeStamp[0].length) + ':' + timeStamp[1];
  }

  getTracks() {
    this.dateParams = (document.getElementById('dateSetter') as HTMLInputElement).value;
    this.timeParams = (document.getElementById('timeSetter') as HTMLInputElement).value;
    if (this.startingCity === undefined || this.destinationCity === undefined) {
      this.alertify.error('Both starting and destination cities must be provided');
    } else if (!this.timeParams || !this.dateParams) {
      this.alertify.error('Both time and date has to be set');
    } else {
      const dateTimeParams = this.dateParams + ' ' + this.timeParams;
      const trackParams = new HttpParams().set('StartingCityId', this.startingCity.id).set('DestinationCityId', this.destinationCity.id)
                                      .set('Date', dateTimeParams);
      this.http.get('http://localhost:5000/tracks/', {params: trackParams}).subscribe(response => {
        this.tracks = response;
        if (this.tracks.length === 0) {
            this.alertify.error('No tracks were found for submitted parameters');
        }
        document.getElementById('checkoutBtn').addEventListener('click', this.proceedToCheckout.bind(this), true);
    }, error => {
        console.log(error);
    });
  }

  }

  onSelectTrack(track) {
    this.selectedTrack = track;
  }

  proceedToCheckout() {
    if (this.selectedTrack === undefined) {
      this.alertify.error('No track has been selected');
    } else {
      this.router.navigate(['/payment']);
    }
  }

}
