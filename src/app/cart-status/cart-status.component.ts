import { Component, OnInit } from '@angular/core';
import { IProducts } from '../products';
import { CartapiService } from '../services/cartapi.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totalPrice:number = 0.00;
  totalQuantity:number = 0;

  constructor(private cartApiService:CartapiService,
              private productService:ProductsService) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }

  updateCartStatus() {
    // subscribe to the cart totalPrice
    this.cartApiService.totalPrice.subscribe(
      data=>this.totalPrice = data
      // When the new event are received , make the assignment to update UI
    );

    // Subscribe to the cart totalQuantity
    this.cartApiService.totalQuantity.subscribe(
      data=>this.totalQuantity = data
    );
  }
}
