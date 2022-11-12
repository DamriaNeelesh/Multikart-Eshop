import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { CartapiService } from '../services/cartapi.service';
import { IProducts } from '../products';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})

export class ShopComponent implements OnInit {

  products:IProducts[] | undefined;
  constructor(private cartApi:CartapiService) { }

    ngOnInit(): void {
    }

  addtoCart(item:any){
    this.cartApi.addToCart(item);

  }

}
