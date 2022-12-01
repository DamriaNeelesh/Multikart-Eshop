import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BeautyService } from '../services/beauty.service';
import { CartapiService } from '../services/cartapi.service';
import { ProductsService } from '../services/products.service';
import { beautyProducts } from '../services/data-types';
// import beautyData from './beautyProducts.json';


@Component({
  selector: 'app-beauty',
  templateUrl: './beauty.component.html',
  styleUrls: ['./beauty.component.css']
})
export class BeautyComponent implements OnInit {

  makeUp:any;
  constructor(private http:HttpClient,private beautyService:BeautyService,cartApi:CartapiService,productService:ProductsService){}
  
  getBeautyData(){
    const url = 'http://makeup-api.herokuapp.com/api/v1/products.json';
    this.http.get(url).subscribe((res)=>{
      // this.data = res;
      
    })
  }
 
  // beautyProducts:beautyData[] = beautyData;

  ngOnInit(): void {
  }
    
}
  

 


