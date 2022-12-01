import { Component, OnInit } from '@angular/core';
import { CartapiService } from '../services/cartapi.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private cartApi:CartapiService) { }

  cartTotal !: any;
  totalPrice!:any;
  totalQuantity!:any;

  ngOnInit(): void {
    this.totalPrice = JSON.parse(localStorage.getItem('totalPrice') as any ) ||[];
    this.totalQuantity = JSON.parse(localStorage.getItem('totalQuantity') as any || []);
    console.warn(`Total Price: ${this.totalPrice}`);
    console.warn(`Total Quantity:${this.totalQuantity}`);
  }

}
