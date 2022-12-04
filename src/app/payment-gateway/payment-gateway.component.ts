import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CartapiService } from '../services/cartapi.service';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.css']
})
export class PaymentGatewayComponent implements OnInit {

  constructor(private cartApi:CartapiService,
              private route:Router) { }


  totalQuantity:number = 0;
  totalPrice:number = 0.00;

  ngOnInit(): void {

    this.cartApi.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    this.cartApi.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );

    // console.log(`Total Amount: ${this.totalPrice}`);
  }

 
  
  // logCartData(){
  //   this.cartApi.logCartData(this.totalPrice,this.totalQuantity);
  // }

  placeOrder(){
    Swal.fire(
      'Thank You for Ordering',
      'Your Order has been Successfully placed',
      'success'     
    );
    this.cartApi.Cartitems = [];
    this.cartApi.totalPrice.next(0);
    this.cartApi.totalQuantity.next(0);
    this.route.navigateByUrl("/home");
  }

}
