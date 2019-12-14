import { FormsModule } from '@angular/forms';
import { WeatherService } from './../_services/weather.service';
import { TracksService } from './../_services/tracks.service';
import { AuthService } from './../_services/auth.service';
import { TrackDataService } from './../_services/trackData.service';
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
  cityGeoLocation: any;
  weatherInfo: any;

  areListenersSet = false;

  constructor(private alertify: AlertifyService, private router: Router,
              private trackDataService: TrackDataService, private authService: AuthService, private tracksService: TracksService,
              private weatherService: WeatherService) { }

  ngOnInit() {
    this.getCities();
    this.setCurrentDate();
  }

  getWeather() {
    if (this.destinationCity) {
    this.weatherService.getGeo(this.destinationCity.name).subscribe(response => {
      this.cityGeoLocation = response;

      this.weatherService.getWeather(this.cityGeoLocation.features[0].geometry.coordinates[1],
        this.cityGeoLocation.features[0].geometry.coordinates[0], `${this.dateParams}T${this.timeParams}:00`).subscribe(weatherResponse =>
          {
            this.weatherInfo = weatherResponse;
          }, weatherError => {
            console.log(weatherError);
          });
    }, error => {
      console.log(error);
    });
  }
  }

  weatherIcon(icon) {
    switch (icon) {
      case 'cloudy':
        return 'cloudy';
      case 'clear-day':
        return 'clear day';
      case 'partly-cloudy-day':
        return 'cloudy day';
      case 'clear-night':
        return 'clear night';
      case 'partly-cloudy-night':
        return 'cloudy night';
      case 'fog':
        return 'fog';
      case 'rain':
        return 'rain';
      case 'sleet':
        return 'sleet';
      case 'snow':
        return 'snow';
      case 'wind':
        return 'wind';
    }
  }

  sendTrackData(): void {
    const obj = {
      startingCity: this.startingCity,
      destinationCity: this.destinationCity,
      price: this.selectedTrack.distance * 2,
      date: this.selectedTrack.date,
      trackId: this.selectedTrack.id
    };
    this.trackDataService.sendTrackData(obj);
  }

  getCities() {
    this.tracksService.getCities().subscribe(response => {
      this.cities = response;
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
      this.tracksService.getTracks(trackParams).subscribe(response => {
        this.tracks = response;
        if (this.tracks.length === 0) {
            this.alertify.error('No tracks were found for submitted parameters');
        }
        if (!this.areListenersSet) {
          this.areListenersSet = true;
        }
    }, error => {
        console.log(error);
    });
  }

  }

  onSelectTrack(track) {
    this.selectedTrack = track;
  }

  dismissTracks() {
    this.selectedTrack = undefined;
  }

  proceedToCheckout() {
    if (this.selectedTrack === undefined) {
      this.alertify.error('No track has been selected');
    } else {
      this.sendTrackData();
      this.router.navigate(['/payment']);
    }
  }

}
