import { AuthService } from './../_services/auth.service';
import { TrackDataService } from './../_services/trackData.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

declare var paypal;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;

  trackObj: any;
  subscribtion: Subscription;
  state: Observable<object>;
  trackIdBody: any = {};

  paidFor = false;

  constructor(private trackDataService: TrackDataService, public activatedRoute: ActivatedRoute, private router: Router,
              private http: HttpClient, private authService: AuthService) {
    this.subscribtion = this.trackDataService.getTrackData().subscribe(trackData => {
      if (trackData) {
        //console.log(trackData);
        this.trackObj = trackData;
      } else {
        this.trackObj = null;
        this.router.navigate(['/tracks']);
      }
    });
  }

  ngOnInit() {
    paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: 'TickABus ticket',
                    amount: {
                      currency_code: 'USD',
                      value: this.trackObj.price
                    }
                  }
                ]

              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              this.paidFor = true;
              console.log(order);
              this.trackIdBody.id = this.trackObj.trackId;
              this.trackIdBody.currentUserId = this.authService.decodedToken.nameid;
              console.log(this.trackIdBody);
              this.http.post('http://localhost:5000/tickets/', this.trackIdBody).subscribe(response => {
                //console.log(response);
                this.router.navigate(['/payment-completed']);
              }, error => {
                console.log(error);
            });
            },
            onError: err => {
              console.log(err);
            }
          })
          .render(this.paypalElement.nativeElement);
  }

}