import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FormsModule } from '@angular/forms';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit, HostListener} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
  selectedTicket: any;
  generatedQr: any;
  
  constructor(private http: HttpClient, private alertify: AlertifyService, private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.getUserTickets();
    document.getElementById('pdfBtn').addEventListener('click', this.saveAsPdf.bind(this), true);
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

  onSelectTicket(ticket) {
    this.selectedTicket = ticket;
  }

  deselectTicket() {
    if (this.selectedTicket !== undefined) {
    this.selectedTicket = undefined;
    }
  }

  saveAsPdf() {
    if (this.selectedTicket === undefined) {
      this.alertify.error('Ticket has to be selected from the tickets list first');
    } else {
      const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
      pdfMake.createPdf(this.getDocumentDefinition()).open();
    }
  }

  getDocumentDefinition() {
    return {
      content: [
        {
          text: 'TICKET',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [{
              text: `From: ${this.selectedTicket.startingCity} To: ${this.selectedTicket.destinationCity}`,
              style: 'name'
            },
            {
              text: `Date: ${this.selectedTicket.date}`
            },
            {
              text: `Price: ${this.selectedTicket.price}$`
            },
            ],
            [
              {qr: this.selectedTicket.id}
            ]
          ]
        }],
        styles: {
          name: {
            fontSize: 16,
            bold: true
          }
        }
    };
  }

}
