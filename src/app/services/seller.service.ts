import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, from } from 'rxjs';
import { signUp, login } from '../data-types';


@Injectable({
  providedIn: 'root'
})
export class SellerService {
  // for checking the error
  isSellerLoggedIn= new BehaviorSubject<boolean>(false);
  isLoginError= new EventEmitter<boolean>(false)

  constructor(private http:HttpClient, private router:Router) { }
  userSignUp(data:signUp){
    this.http.post('http://localhost:3000/seller',
    data,
    {observe:'response'}).subscribe((result)=>{ 
      // console.warn(result)
      if(result){
        localStorage.setItem('seller',JSON.stringify(result.body))
        this.router.navigate(['seller-home'])
      }
    })
  } 
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true)
      this.router.navigate(['seller-home'])
    }
  }
  userLogin(data:login){
    // http://localhost:3000/customer?email=damrianeelesh@gmail.com&password=neeleshdamria
   this.http.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
   {observe:'response'}).subscribe((result:any)=>{
    console.warn(result)
    // In above hamne pehle wo http url banaya postman se check krke then ab jo bhi login hoga uska data uske url mai chala jaega 
    // then wahan se ham usko observe krke usko reposnse mai daal denge and uss repsonse ko ham apne local storage mai save kr lenge
    // uss reponse ki body ko uske length sb check krke .setItem use krenge
    if(result && result.body && result.body.length===1){
      this.isLoginError.emit(false)
      localStorage.setItem('seller',JSON.stringify(result.body))
      this.router.navigate(['seller-home'])
    }else{
      console.warn("login failed"); // login fail hone pe error ko true kr denge
      this.isLoginError.emit(true)
    }
   })
  }
}