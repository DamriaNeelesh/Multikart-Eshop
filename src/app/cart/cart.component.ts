import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartapiService } from 'src/app/services/cartapi.service';
import { IProducts } from '../products';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts: IProducts[] = [];
  items = this.cartApi.getProductData();
  Cartitems:IProducts[] = [];
  cartItems:IProducts[]=[];
  totalPrice:number=0;
  totalQuantity: number=0;
  mobile?:true;
  constructor(private api:ProductsService,
             private  cartApi:CartapiService,
             private toastr:ToastrService) {

  }

  addToCart(product){
     this.cartApi.addToCart(product);
     this.toastr.success(`Product Added Successfully: ${{product}}`);
     localStorage.setItem('product',JSON.stringify(this.Cartitems));
     
  }

  ngOnInit(){
    this.listCartDetails();

    if (window.screen.width === 360) { // 768px portrait
      this.mobile = true;
    }
  }

  listCartDetails(){
    // get a handle to the cart items
    this.cartItems = this.cartApi.Cartitems;

    // subscribe to the cart totalPrice
    this.cartApi.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    // subscribe to the cart totalQuantity
    // Wo starting ke top wali se uthake subscribe krke yahan pe de diya
    this.cartApi.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    // compute cart total price and total quantity
    this.cartApi.computeCartTotals();
  }

  incrementQuantity(product:IProducts){
        // product => theCartItem
     this.cartApi.addToCart(product);
    //  this.toastr.success('Product Added Successfully');

  }

  // For removing the product from the Cart detail page usng button of remove fxn
  remove(theCartItem:IProducts){
     this.cartApi.remove(theCartItem);
     this.toastr.show('All  cart Products removed Successfully');
  }

  decrementQuantity(theCartItem:IProducts){
    this.cartApi.decrementQuantity(theCartItem);
    this.toastr.error('Product Removed Successfully');

  }
}
