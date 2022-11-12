import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartapiService } from '../services/cartapi.service';
import { ProductsService } from '../services/products.service';
import { IProducts } from '../products';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  totalItemNumber:number = 0;

  constructor(private route: ActivatedRoute,
    private apiService:CartapiService
   ,private _productsService:ProductsService) { }  

products?:IProducts[];

  ngOnInit(): void {
    this.products = this._productsService.getProducts();
    this.filterCategory = this.products;
    // Hamne wo cartApi wali service mai jo getProductData wala fxn banaya tha usme se wo totla no. wale ki length li hai kaam mai
    }
    public filterCategory: any;
  }

