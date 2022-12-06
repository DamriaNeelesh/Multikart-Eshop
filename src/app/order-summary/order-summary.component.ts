import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Purchase } from '../ordersData/purchase';
import { CartapiService } from '../services/cartapi.service';
import { CheckoutService } from '../services/checkout.service';
import { CheckOutComponent } from '../check-out/check-out.component';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  constructor(private cartApi:CartapiService,
              private checkout:CheckoutService ) { }

@ViewChild(CheckOutComponent, {static: true})

  totalQuantity:number = 0;
  totalPrice:number = 0.00;

  checkoutFormGroup!: FormGroup;
  
  ngOnInit(): void {
    this.cartApi.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    this.cartApi.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );
  }

  // Using the API service then we
  reviewCartDetails(){
    // Subscribe to cartService.totalQuantity
    this.cartApi.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );
    
    // Subscribe to cartservice.totalPrice
    this.cartApi.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );
  }


}
