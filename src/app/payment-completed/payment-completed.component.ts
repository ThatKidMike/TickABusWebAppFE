import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-completed',
  templateUrl: './payment-completed.component.html',
  styleUrls: ['./payment-completed.component.css']
})
export class PaymentCompletedComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    document.getElementById('mainPageBtn').addEventListener('click', this.navigateToMain.bind(this, 'tracks'), true);
    document.getElementById('ticketsBtn').addEventListener('click', this.navigateToMain.bind(this, 'tickets'), true);
  }

  navigateToMain(id) {
    this.router.navigate([`/${ id }`]);
  }

}

