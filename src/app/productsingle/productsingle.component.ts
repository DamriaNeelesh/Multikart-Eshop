import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CartapiService } from '../services/cartapi.service';
import { ProductsService } from '../services/products.service';
import { HttpClient } from '@angular/common/http';
import { IProducts } from '../products';
import { map, Observable, of } from 'rxjs';
import { Pipe } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-productsingle',
  templateUrl: './productsingle.component.html',
  styleUrls: ['./productsingle.component.css']
})
export class ProductsingleComponent implements OnInit {
 // @Input()
  product:IProducts|undefined;
  products: IProducts[] = [];
  // productData:any;
   imageUrl1: string = '';
   imageUrl2: string = '';
  constructor(private apiService: CartapiService,
              private _productsService: ProductsService,
              private route : ActivatedRoute,
              private toastr:ToastrService) { }

    ngOnInit(): void {

      this.products = this._productsService.getProducts();
      // First get the product id from the current route.
      const routeParams = this.route.snapshot.paramMap;
      // Snapshot is the property of the activated route which contains the info about the current active route
      console.log(routeParams);
      const productIdFromRoute = Number(routeParams.get('product_id'));
      console.log(productIdFromRoute);
       // Find the product that correspond with the id provided in route.
      this.product = this.products.find(product => product.product_id===productIdFromRoute);
      console.log(this.product);
    }

    addToCart(product: IProducts) {
      this.apiService.addToCart(product);
      console.log(`Adding to Cart: ${product.product_name} Price: Rs. ${product.product_price}`);
      // this.toastr.success('Product Added Successfully');

    }

}
