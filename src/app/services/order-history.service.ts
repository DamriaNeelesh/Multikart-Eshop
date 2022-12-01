import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../ordersData/order';
import { OrderHistory } from '../ordersData/OrderHistory';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
  // OrderHistory:any[] | undefined;
  private orderUrl = 'http:localhost:3000/orders';
  // for making rest api call we will inject httpclient in constructor
  constructor(private httpClient:HttpClient) {}

  getOrderHistory(theEmail:string):Observable<GetResponseOrderHistory>{
    // need to build URL based on the customer email
    const orderHistoryUrl = `${this.orderUrl}/search/findByCustomerEmailOrderByDateCreatedDesc?email=${theEmail}`;    
    
    return this.httpClient.get<GetResponseOrderHistory>(orderHistoryUrl);
  }
}

interface GetResponseOrderHistory{
  _embedded:{
    orders:OrderHistory[];
  }
}

// orders: OrderHistory[];  --> GetResponseOrderHistory
