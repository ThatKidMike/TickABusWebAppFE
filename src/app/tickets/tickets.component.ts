import { FormsModule } from '@angular/forms';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})

export class TicketsComponent implements OnInit {

  userTickets: any;
  elementType: 'url' | 'canvas' | 'img' = 'url';
  startingCitySearch: any;
  destinationCitySearch: any;
  filteredTickets: any;
  dateSearch: any;

  constructor(private http: HttpClient, private alertify: AlertifyService, private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.getUserTickets();
  }

  getUserTickets() {
    const userIdParam = this.authService.decodedToken.nameid;
    const httpParams = new HttpParams().set('UserId', userIdParam);
    this.http.get('http://localhost:5000/tickets/usertickets', { params: httpParams }).subscribe(response => {
      this.userTickets = response;
      //console.log(response);
    }, error => {
      console.log(error);
    });
  }

}
