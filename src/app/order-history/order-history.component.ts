import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Order } from '../ordersData/order';
import { OrderHistory } from '../ordersData/OrderHistory';
import { IProducts } from '../products';
import { CartapiService } from '../services/cartapi.service';
import { OrderHistoryService } from '../services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  
  orderHistoryList:OrderHistory[] = [];
  storage:Storage = localStorage;  // Reference to web browser storage

  items = this.cartApi.getProductData();
  Cartitems:IProducts[] = [];
  cartItems:IProducts[]=[];
  totalPrice:number=0;
  totalQuantity: number=0;
  
  constructor(private orderHistoryService:OrderHistoryService,
              private oauthService:OAuthService,
              private cartApi:CartapiService) { }

  ngOnInit(): void {
    
  }

  reviewCartDetails(){
    // Subscribe to cartService.totalQuantity
    this.cartApi.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );
    
    // Subscribe to cartservice.totalPrice
    this.cartApi.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );

    this.cartApi.Cartitems === this.orderHistoryList;
  }

  get token(){
    let claims:any = this.oauthService.getIdentityClaims();
    return claims ? claims : null;
  }



 

}
