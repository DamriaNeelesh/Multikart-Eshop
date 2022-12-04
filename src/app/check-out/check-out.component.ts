import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../services/form.service';
import { Country } from '../models/country.model';
import { State } from '../models/state.model';
import { City } from '../models/city.model';
import { CountryStateCityApiService } from '../services/country-state-city-api.service';
import { CartapiService } from '../services/cartapi.service';
import { ToastrService } from 'ngx-toastr';
import { CheckoutService } from '../services/checkout.service';
import { Router } from '@angular/router';
import { Order } from '../ordersData/order';
import { OrderItem } from '../ordersData/order-item';
import { Purchase } from '../ordersData/purchase';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {


  checkoutFormGroup!: FormGroup;  // Use of Safe Navigation bt using '?' and '!'
  totalPrice: number = 0;
  totalQuantity: number=0;
  creditCardYears:number[]=[];
  creditCardMonths:number[]=[];

  // For making Country,City, State Drop Down using Api
  listCountry!:Country[];
  countrySelected!:string;
  listState!:State[];
  selectedState!:string;
  listCity!:City[];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  storage: Storage = sessionStorage;

  constructor(private formBuilder:FormBuilder,
              private formService:FormService,
              private countryApi:CountryStateCityApiService,
              private cartApi:CartapiService,
              private toastr:ToastrService,
              private checkoutService:CheckoutService,
              private router:Router) { }

  ngOnInit(): void {

    this.fetchCountry();
    // Adding Form Validations
    // Adding Validations for the Customer detail Input firstName,lastName and e-mail Id

    this.reviewCartDetails();

    // read the user's email address from browser storage
    const theEmail = JSON.parse(this.storage.getItem('userEmail')!);

    this.checkoutFormGroup = this.formBuilder.group({

      customer:this.formBuilder.group({
        firstName:new FormControl('',[Validators.required,
                                      Validators.minLength(3),
        /* CustomFormValidator.notOnlyWhitespace  */       ]), // Adding the custom validation taaki name mai space na aa jae

        lastName: new FormControl('',[Validators.required,
                                      Validators.minLength(3)]),

        email: new FormControl ('theEmail',  [Validators.required,
                                      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")] ),
      }),

      shippingAddress: this.formBuilder.group({
        street:new FormControl('',[Validators.required,
                                  Validators.minLength(3)]),
        // apartment:new FormControl('',[Validators.required,
        //                               Validators.minLength(3)]),
        city:new FormControl('',[Validators.required,
                                 Validators.minLength(3)]),
        // phone:new FormControl('',[Validators.required,
        //                           Validators.minLength(10)]),
        state:new FormControl('',[Validators.required]), // DropDown and recommendation
        country:new FormControl('',[Validators.required]), // DropDown and recommendation
        zipCode:new FormControl('',[Validators.required,
                                    Validators.minLength(6)]),
      }),

      billingAddress:this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2)]),
        // apartment:new FormControl('', [Validators.required, Validators.minLength(2)]),
        city: new FormControl('', [Validators.required, Validators.minLength(2)]), // Dropdown and recommendations
        // phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
        state: new FormControl('', [Validators.required]), // DropDown and recommendation
        country:new FormControl('', [Validators.required]), // DropDown and recommendation
        zipCode:new FormControl('', [Validators.required, Validators.minLength(6)]),
      }),

      creditCard:this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard:  new FormControl('', [Validators.required, Validators.minLength(2)]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
        expirationMonth:[''],
        expirationYear: ['']
      })

    });


    // Getting the  current Month and Populate credit Card months
    // In Javascript Date object the months are zero based so we need to add 1 to get (1.....12)
    const startMonth:number = new Date().getMonth() + 1;
    console.log("start Month:"+ startMonth);
    // Get the Credit Card Month
    this.formService.getCreditCardMonths(startMonth).subscribe(
      data=>{
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );

    // Populate Credit Card Years
    // Similarly for the getCreditCardYears
    const startYear:number = new Date().getFullYear();
    console.log("Start year: "+ startYear);
    // Get The credit Card Year
    this.formService.getCreditCardYears().subscribe(
      data=>{
        console.log("Retrieved credit card Years: "+ JSON.stringify(data));
        this.creditCardYears = data;
      }
    )
  }

  fetchCountry(){
    this.countryApi.getCountry().subscribe(data=>{
      this.listCountry = data;
      console.log("Countries Fetched:", this.listCountry)
    })
  }

  onCountrySelected(countryIso: any){
    this.countryApi.getStateOnSelectedCountry(countryIso).subscribe(data=>{
      this.listState = data
      console.log('States Retrieved', this.listState)
    })
  }

  onStateSelected(countryparam = this.countrySelected, stateparam = this.selectedState){
    this.countryApi.getCitiesOnSelectedState(countryparam, stateparam).subscribe(data=>{
      this.listCity = data
      console.log('Cities retrieved', this.listCity)
    })
  }



  handleMonthsAndYears(){
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard'); //we will target creditCard form Control from FormBuilder
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);
    // if the current year equals the selected year, then start with current month
    let startMonth:number;

    if(currentYear === selectedYear){
      startMonth = new Date().getMonth()+1; // Get the Current Month
    }
    else{
      startMonth = 1; // Now the for loop range of months starts from '1'
    }

    this.formService.getCreditCardMonths(startMonth).subscribe( // get the Credit Card Months
      data=>{
        console.log("Retrieved Credit card months Later on : "+ JSON.stringify(data));
        this.creditCardMonths = data;
        console.log(data);
      }
    );
  }

  onSubmit(){

      // Now we will get the customer data from the checkoutFormGroup
    // We can Also modify according to our need to get the customer responses
    console.log(this.checkoutFormGroup.get('customer')?.value); // we have to use the dsafe navigation to target the customer in the form group to avoid the 'null Object' error
    console.log("email: "+ this.checkoutFormGroup.get('customer')?.value.email); // We will get the user's email Id
    console.log("The Shipping Country,State and City is"+ this.checkoutFormGroup.get('this.shippingAddressCountry') + this.checkoutFormGroup.get('this.shippingAddressState') + this.checkoutFormGroup.get('this.shippingAddressCity'))
 
// Touching all fields triggers the display of the error messages
    // if(this.checkoutFormGroup.invalid){
    //   this.checkoutFormGroup.markAllAsTouched();
    //   return;
    // }

    // Set up Order
    let order = new Order(this.totalQuantity, this.totalPrice);
    // order.totalPrice = this.totalPrice;
    // order.totalQuantity = this.totalQuantity
    
    // get Cart Items
    const cartItem = this.cartApi.Cartitems;

    // create orderItems from cartItems
    // LONG WAY:

/*  let orderItems:OrderItem[] = [];
    for(let i=0;i<cartItem.length; i++){
      orderItems[i] = new OrderItem(cartItem[i]);
    }
*/    
    // Short Way of doing above one
    let orderItems: OrderItem[] = cartItem.map(tempCartItem => new OrderItem(tempCartItem.product_img,tempCartItem.product_price,tempCartItem.product_quanity,tempCartItem.product_id));
    // console.log(`Order Items are :${orderItems}`);
    // set up purchase
    let purchase = new Purchase();

    // populate purchase - customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;
 

    // populate puchase - shipping Address
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;  // ShippingAddress ke from ka control hath mai liya vale ke sath
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state)); // shippingState ke andr upr wale form se state ki value ko stringify kiya
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country)); // same for Country
    const shippingCity: City = JSON.parse(JSON.stringify(purchase.shippingAddress.city)); // Same for city
    purchase.shippingAddress.state = shippingState.name; // purchase ki shippingAddress state ko hamne upr wale shippingState se .value ki tarah name acquire kiya
    purchase.shippingAddress.country = shippingCountry.name; // same as above line for country
    purchase.shippingAddress.city = shippingCity.name;

    console.log(`Shipping State:${this.shippingAddressState?.value}`);
    console.log(`Shipping Country:${this.shippingAddressCountry?.value}`);
    console.log(`Shipping City:${this.shippingAddressCity?.value}`);
    
    // populate purchase - billing Address
    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
    const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
    const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
    const billingCity: City = JSON.parse(JSON.stringify(purchase.billingAddress.city));
    purchase.billingAddress.state = billingState.name; 
    purchase.billingAddress.country = billingCountry.name;
    purchase.billingAddress.city = billingCity.name;
    
    console.log(`Billing State:${this.billingAddressState?.value}`);
    console.log(`Billing Country:${this.billingAddressCountry?.value}`);
    console.log(`Billing City:${this.billingAddressCity?.value}`);


    // populate purchase - order and orderItems
    purchase.order = order;
    purchase.orderItems = orderItems;

    console.log(order);  // Array of Order and Items
    console.log(orderItems);

    // call API via the CheckoutService
    this.checkoutService.placeOrder(purchase).subscribe({
       next:response=>{
        alert(`Your order has been received./nOrder tracking number: ${response.orderTrackingNumber}`);
        console.log(response.orderTrackingNumber);
        //reset the cart
        this.resetCart();
        
      },
       error: err=>{
        alert(`There was an error:${err.message}`);
       }
    });
   }


  resetCart(){
    // reset cart data
    this.cartApi.Cartitems = [];
    this.cartApi.totalPrice.next(0);
    this.cartApi.totalQuantity.next(0);

    // reset the form
    this.checkoutFormGroup.reset();

    // navigate back to product page/home page
    this.router.navigateByUrl("/product-list");
  }

  // Copying the Shipping data to billing Address
  copyShippingAddressToBillingAddress(event) {
     if(event.target.checked){
       this.checkoutFormGroup.controls['billingAddress']
       .setValue(this.checkoutFormGroup.controls['shippingAddress'].value)

       // bug fix for states
      this.billingAddressState === this.shippingAddressState;
     }
     else{
      this.checkoutFormGroup.controls['billingAddress'].reset(); // Billing Address ke data ko reset kr dega agr checkbox ticked nhi hai toh
     }
    }

  // Defining Getter methods to access form Controls
  // First I created a Form and their controls the below I amde a function to get  or call that controls and Validatons and these functions will be used inside the html
  get firstName(){ return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName(){ return this.checkoutFormGroup.get('customer.lastName');}
  get email(){ return this.checkoutFormGroup.get('customer.email');}

  get shippingAddressStreet(){ return this.checkoutFormGroup.get('shippingAddress.street');}
  get shippingAddressCity(){ return this.checkoutFormGroup.get('shippingAddress.city');}
  get shippingAddressState(){ return this.checkoutFormGroup.get('shippingAddress.state');}
  get shippingAddressZipCode(){ return this.checkoutFormGroup.get('shippingAddress.zipCode');}
  get shippingAddressCountry(){ return this.checkoutFormGroup.get('shippingAddress.country');}

  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street'); }
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city'); }
  get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state'); }
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode'); }
  get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country'); }

  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }


  getStateOnSelectedCountry(formGroupName: string) {

    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.countryApi.getStateOnSelectedCountry(countryName).subscribe(
      data => {

        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data;
        }
        else {
          this.billingAddressStates = data;
        }

        // select first item by default
        formGroup?.get('state')?.setValue(data[0])
      }
    );
  }

// Using the API service then we
  reviewCartDetails(){
    // Subscribe to cartService.totalQuantity
    this.cartApi.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );
    // Subscribe to cartservice.totalPrice
    this.cartApi.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );
  }

  

}