import { TrackDataService } from './../_services/trackData.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

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

  paidFor = false;

  constructor(private trackDataService: TrackDataService, public activatedRoute: ActivatedRoute, private router: Router) {
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
                    description: this.trackObj.startingCity,
                    amount: {
                      currency_code: 'USD',
                      value: this.trackObj.distance * 2
                    }
                  }
                ]

              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              this.paidFor = true;
              console.log(order);
            },
            onError: err => {
              console.log(err);
            }
          })
          .render(this.paypalElement.nativeElement);
  }

}
