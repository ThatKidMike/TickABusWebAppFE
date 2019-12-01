import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

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
  msg: any;

  constructor(private http: HttpClient) { }

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
    if (this.startingCity === undefined || this.destinationCity === undefined) {
      this.msg = 'Both starting and destination cities must be provided';
    } else {
      this.msg = '';
      const dateParams = (document.getElementById('dateSetter') as HTMLInputElement).value;
      const timeParams = (document.getElementById('timeSetter') as HTMLInputElement).value;
      const dateTimeParams = dateParams + ' ' + timeParams;
      const trackParams = new HttpParams().set('StartingCityId', this.startingCity.id).set('DestinationCityId', this.destinationCity.id)
                                      .set('Date', dateTimeParams);
      this.http.get('http://localhost:5000/tracks/', {params: trackParams}).subscribe(response => {
        this.tracks = response;
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
      this.msg = 'No track has been selected';
    } else {
      this.msg = '';
    }
  }

}
