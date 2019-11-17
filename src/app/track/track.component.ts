import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
  cities: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getCities();
    this.setCurrentDate();
  }

  getCities() {
    this.http.get('http://localhost:5000/cities/').subscribe(response => {
      this.cities = response;
    }, error => {
      console.log(error);
    })
  }

  setCurrentDate() {
    const currentDateAndTime = new Date();
    (document.getElementById('dateSetter') as HTMLInputElement).valueAsDate = currentDateAndTime;
    const timeStamp = currentDateAndTime.toString().split(':', 2);
    (document.getElementById('timeSetter') as HTMLInputElement).value
    = timeStamp[0].substring(timeStamp[0].length - 2, timeStamp[0].length) + ':' + timeStamp[1];
  }

}
