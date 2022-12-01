import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Order } from '../ordersData/order';
import { OrderHistory } from '../ordersData/OrderHistory';
import { OrderHistoryService } from '../services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  
  orderHistoryList:OrderHistory[] = [];
  storage:Storage = localStorage;  // Reference to web browser storage

  constructor(private orderHistoryService:OrderHistoryService,
              private oauthService:OAuthService) { }

  ngOnInit(): void {
    this.handleOrderHistory();
  }

  get token(){
    let claims:any = this.oauthService.getIdentityClaims();
    return claims ? claims : null;
  }

  handleOrderHistory(){
    
    // read the user's email address from the browser storage
    const theEmail = JSON.parse(this.storage.getItem('userEmail')!);
    console.log(theEmail);
    // retrieve data from the service
    this.orderHistoryService.getOrderHistory(theEmail).subscribe(
      data=>{
        this.orderHistoryList = data._embedded.orders;
        console.log(this.orderHistoryList);
      }
    );
  }

}
