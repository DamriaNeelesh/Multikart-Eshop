import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { signUp, login } from '../data-types';
import { CartapiService } from '../services/cartapi.service';
import { ProductsService } from '../services/products.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})

export class UserAuthComponent implements OnInit {

  constructor(private user: UserService, 
              private product: ProductsService,
              private cart:CartapiService,
              private toastr:ToastrService) { }

  showLogin: boolean = true
  authError: string = "";

  ngOnInit(): void {
    // this will prevent us from direct accessing
    this.user.userAuthReload();
  }

  signUp(data: signUp) {
    this.user.userSignUp(data);
  }

  login(data: login) {
    this.user.userLogin(data)
    this.user.invalidUserAuth.subscribe((result) => {
      // console.warn(result);
      if (result) {
        this.authError = "User not found";
        console.warn(this.authError);
        this.toastr.warning("User Not Found");
        
        // alert(this.authError);
      } else{
        this.localCartToRemoteCart();
        this.toastr.success("Welcome to NeelShop");
      }

    })
  }

  openSignUp() {
    this.showLogin = false
  }
  openLogin() {
    this.showLogin = true;
  }

  localCartToRemoteCart(){
   let data = localStorage.getItem('localCart');
   
  }

}
