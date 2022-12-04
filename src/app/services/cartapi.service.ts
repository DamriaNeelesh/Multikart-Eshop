import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IProducts } from '../products';
import { ToastrService } from 'ngx-toastr';
import { order } from './data-types';
import { product } from '../data-types';
import { data } from 'jquery';
@Injectable({
  providedIn: 'root'
})
export class CartapiService {
// Yahan pr ham get,set,remove product wale kaam krenge
  Cartitems:IProducts[] = [];
// behavior subject ensures that the component consuming the service receives the last updated data
// even if there are no new updates since the component's subscription to this data.
// Subject is a subClass of Observable . The event will be sent to all the subbscribers same as the use of the <Subject>

//  totalPrice: Subject<number> = new Subject<number>();
//  totalQuantity:Subject<number> = new Subject<number>();

// But we will use ReplaySubject to keep track of previous
// It will also replay events for the new subscribers who join later
// keep a buffer of previous events and send to new

// But he Best Solution is using the BehaviourSubject<number>(0);

totalPrice: Subject<number> = new BehaviorSubject<number>(0); // Set initial price 0
totalQuantity:Subject<number> = new BehaviorSubject<number>(0);

  productList = new BehaviorSubject<any>([]);
  product_quantity?:number = 0;

  constructor(private http:HttpClient) { }

// Getting the Productsfrom the requests
  getProductData(){
    return this.Cartitems;
  }

// Set Product Data
  setProduct(product:any){
    // Jis Element ko hamne click kiya hai wo aur uska data push ho jaega
    this.Cartitems.push(...product);
    this.productList.next(product)
  }

// Add to Cart Detail
  addToCart(product:IProducts){
    
    let alreadyExistInCart: boolean = false;
    let existingCartItem:IProducts | undefined ;
    // this.Cartitems.push(product);
    // this.productList.next(this.Cartitems);
// Yeh upr wale ki wajah se ek click mai uske multiple times push ho rha tha product balki mene push wala kaam neeche define kr diya tha already


 // Check if we already have the item in the cart
 // Sometime we will get error regarding the variable not assigned aur assigned before declaration due to | undefined

    if(this.Cartitems.length>0){
      // find the item in the Cart based on item id
      for(let tempCartItems of this.Cartitems){
        if(tempCartItems.product_id === product.product_id){
          existingCartItem = tempCartItems;
          break;
        }
      }
      // The above code inside the for loop can be refractor by:
      // existingCartItem = this.Cartitems.find(tempCartItem=>tempCartItem.product_id === product.product_id)

      // Check if we found it add that product quantity in itself not extra
      alreadyExistInCart = (existingCartItem != undefined);
    }

    if(alreadyExistInCart){
      // increment the quantity of that item
      // existingCartItem.quantity++;
      //---------------------------------------------------------------------------------------------------------------------
      existingCartItem!.product_quanity++;
    }
    else{
      // Just add the item to the Array
      // theCartItem == product
      this.Cartitems.push(product);
      this.http.post('http://localhost:3000/localCart',this.getProductData());
      // we have to post the product cart detail inside the json server 
    }

    // Compute the Cart total price and total quantity
    this.computeCartTotals();
    // console.log(this.Cartitems.length);
    // console.log(this.Cartitems);

  }

  computeCartTotals(){
    let  totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    for(let currentCartItem of this.Cartitems){
      totalPriceValue += currentCartItem.product_quanity * currentCartItem.product_price;
      totalQuantityValue += currentCartItem.product_quanity;
    }

    // Publish the new values ..All subscribers will receive the new values
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // Log cart data just for debugging Process
    this.logCartData(totalPriceValue,totalQuantityValue);
  }

  logCartData(totalPriceValue:number,totalQuantityValue:number){
    console.log('Content of the Cart');
    // this.http.post('http://localhost:3000/localCart',this.Cartitems,{observe:'response'}).subscribe((result)=>{
    //   if(result){
    //     localStorage.setItem('cart',JSON.stringify(result.body));
    //   }
    // });

    for(let tempCartItems of this.Cartitems){
      const subTotalPrice = tempCartItems.product_quanity * tempCartItems.product_price;
      console.log(`Name: ${tempCartItems.product_name}, Quantity: ${tempCartItems.product_quanity},
                   UnitPrice:${tempCartItems.product_price}, subTotalPrice: ${subTotalPrice}`);
    }

    console.log(`Total Price: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('----------------');

  }

  saveCartToLocalStorage(){
     localStorage.setItem('cart',JSON.stringify(this.Cartitems));
     
  }


  // remove Cart data One by One
  removeCartData(product:any){
    this.Cartitems.map((a:any,index:any)=>{
      if(product.id == a.id){
        this.Cartitems.splice(index,1);
        this.http.delete('http://localhost:3000/localCart/' + product)
      }
    })
    this.productList.next(this.Cartitems);
  }

  orderNow(data:order){
    return this.http.post('http://localhost:3000/orders',data);
  }

  orderList(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>('http://localhost:3000/orders?userId='+userData.id);
  }

  cancelOrder(orderId:number){
    return this.http.delete('http://localhost:3000/orders/'+orderId)
  }
  

  // localAddToCart(data:string){
  //   let cartData = [];
  //   let localCart = localStorage.setItem('logCartData',JSON.stringify(this.logCartData));
  //   if(!localCart){
  //     localStorage.setItem('localCart',JSON.stringify([data]));
  //     this
  //   }
  // }

  removeAllCart(){
    this.Cartitems=[] // Empty array assign kr denge
    this.productList.next(this.Cartitems);
    return this.Cartitems;
  }

  decrementQuantity(theCartItem:IProducts){
    theCartItem.product_quanity--;
    // product => theCartItem
    if(theCartItem.product_quanity === 0){
       this.remove(theCartItem);
    }
    else{
      this.computeCartTotals();
    }
  }

  remove(theCartItem:IProducts){
   // get the index of the item in the array
   const itemIndex = this.Cartitems.findIndex(tempCartItem => tempCartItem.product_id == theCartItem.product_id)

   // If found, remove the item from the array at the given index
   if(itemIndex > -1){
    this.Cartitems.splice(itemIndex,1); // Removing only one element at a time
    this.computeCartTotals();
   }
  }

}
