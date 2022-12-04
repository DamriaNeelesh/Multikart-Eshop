import { Component, OnInit } from '@angular/core';
import { CartapiService } from '../services/cartapi.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  constructor(private cartApi:CartapiService) { }
  totalPrice: number = 0;
  totalQuantity: number=0;
  
  ngOnInit(): void {
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
