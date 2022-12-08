import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Purchase } from '../ordersData/purchase';
import { CartapiService } from '../services/cartapi.service';
import { CheckoutService } from '../services/checkout.service';
import { CheckOutComponent } from '../check-out/check-out.component';
import { FormService } from '../services/form.service';
import { IProducts } from '../products';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {




  constructor(private cartApi:CartapiService,
              private checkout:CheckoutService,
               ) { }



  totalQuantity:number = 0;
  totalPrice:number = 0.00;
  cartItems:IProducts[]=[];

  checkoutFormGroup!: FormGroup;
  
  ngOnInit(): void {
    this.cartApi.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    this.cartApi.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );

    this.cartItems = this.cartApi.Cartitems;
   
   
 
    // Adding Form Validations
    // Adding Validations for the Customer detail Input firstName,lastName and e-mail Id

    this.reviewCartDetails();
  }


  // customer = this.checkoutFormGroup.get('customer')?.value;
  // shippingAddressCountry = this.checkoutFormGroup.get('this.shippingAddressCountry')?.value;
  // shippingAddressState =  this.checkoutFormGroup.get('this.shippingAddressState')?.value; 
  // shippingAddressCity =  this.checkoutFormGroup.get('this.shippingAddressCity')?.value;

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
