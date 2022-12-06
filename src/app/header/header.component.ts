import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartapiService } from '../services/cartapi.service';
import { ProductsService } from '../services/products.service';
import { IProducts } from '../products';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  totalItemNumber: number = 0;
  menuType: string = 'default';
  sellerName:string="";
  userName:string="";
  searchResult:undefined|IProducts[];
  cartItems=0;
  constructor(
    private apiService: CartapiService,
    private _productsService: ProductsService,
    private router:Router) { }
    
    products?: IProducts[];
    
    ngOnInit(): void {
      this.products = this._productsService.getProducts();
    this.filterCategory = this.products;
    // Hamne wo cartApi wali service mai jo getProductData wala fxn banaya tha usme se wo totla no. wale ki length li hai kaam mai
    
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
         let sellerStore=localStorage.getItem('seller');
         let sellerData =sellerStore && JSON.parse(sellerStore)[0];
         this.sellerName=sellerData.name;
         this.menuType = 'seller';
        }
        else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName= userData.name;
          this.menuType='user';
          // this.product.getCartList(userData.id);
        }
         else {
          this.menuType = 'default';
        }
      }
    });
    let cartData= localStorage.getItem('localCart');
    // if(cartData){
      // this.cartItems= JSON.parse(cartData).length
      // }
      // this.product.cartData.subscribe((items)=>{
        // this.cartItems= items.length }) 
      }
      
      public filterCategory: any;
      
      logout() {
        localStorage.removeItem('seller');
    this.router.navigate(['/seller-auth'])
  }
  
  userLogout(){
    localStorage.removeItem('user');
    localStorage.removeItem('users');
    this.router.navigate(['/user-auth'])
    // this.product.cartData.emit([])
  }

  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
  }


}

