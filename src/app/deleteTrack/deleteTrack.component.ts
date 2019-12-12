import { TracksService } from './../_services/tracks.service';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-deleteTrack',
  templateUrl: './deleteTrack.component.html',
  styleUrls: ['./deleteTrack.component.css']
})
export class DeleteTrackComponent implements OnInit {
  tracks: any;
  selectedTrack: any;
  sCity: any;
  dCity: any;

  constructor(private authService: AuthService, private http: HttpClient, private alertify: AlertifyService,
              private tracksService: TracksService) { }

  ngOnInit() {
    this.getTracks();
    document.getElementById('deleteBtn').addEventListener('click', this.deleteTrack.bind(this), true);
  }

  getTracks() {
    this.tracksService.getTracksNoParams().subscribe(response => {
      this.tracks = response;
      this.getCityNames();
    }, error => {
      console.log(error);
    });
  }

  getCityNames() {
    this.tracks.forEach(track => {
     this.tracksService.getCityName(track.startingCityId).subscribe(response => {
        this.sCity = response;
        track.startingCityId = this.sCity.name;
      }, error => {
        console.log(error);
      });

     this.tracksService.getCityName(track.destinationCityId).subscribe(response => {
        this.dCity = response;
        track.destinationCityId = this.dCity.name;
      }, error => {
        console.log(error);
      });
    });
  }

  deleteTrack() {
    this.tracksService.deleteTrack(this.selectedTrack.id).subscribe(response => {
      //console.log(response);
      this.getTracks();
      this.alertify.success('Track deleted');
    }, error => {
      console.log(error);
      this.alertify.error('Deletion error');
    });

  }

}
