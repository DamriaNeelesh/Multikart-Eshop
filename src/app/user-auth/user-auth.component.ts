import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { signUp, login } from '../data-types';
import { CartapiService } from '../services/cartapi.service';
import { ProductsService } from '../services/products.service';
import { UserService } from '../services/user.service';
import { Toast } from 'ngx-toastr';
import Swal from 'sweetalert2';

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

  // Toast = Swal.mixin({
  //   toast: true,
  //   position: 'top-end',
  //   showConfirmButton: false,
  //   timer: 3000,
  //   timerProgressBar: true,
  //   didOpen: (toast) => {
  //     toast.addEventListener('mouseenter', Swal.stopTimer)
  //     toast.addEventListener('mouseleave', Swal.resumeTimer)
  //   },
  //   icon:'success',
  //   title:'Signed in siccessfully'
  // })

  login(data: login) {
    this.user.userLogin(data)
    this.user.invalidUserAuth.subscribe((result) => {
      // console.warn(result);
      if (result) {
        this.authError = "User not found";
        // console.warn(this.authError);
        this.toastr.warning("User Not Found");
        
        // alert(this.authError);
      } else{
        this.localCartToRemoteCart();
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          },
          icon:'success',
          title:'Signed in successfully'
        })
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
