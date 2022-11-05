import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../services/form.service';
import { CommonModule } from '@angular/common';
import { Country } from '../models/country.model';
import { State } from '../models/state.model';
import { City } from '../models/city.model';
import { CountryStateCityApiService } from '../services/country-state-city-api.service';
import { CustomFormValidator } from '../models/custom-form-Validator';
import { CartapiService } from '../services/cartapi.service';
import { ToastrService } from 'ngx-toastr';

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


  constructor(private formBuilder:FormBuilder,
              private formService:FormService,
              private countryApi:CountryStateCityApiService,
              private cartApi:CartapiService,
              private toastr:ToastrService) { }

  ngOnInit(): void {

    this.fetchCountry();
    // Adding Form Validations
    // Adding Validations for the Customer detail Input firstName,lastName and e-mail Id

    this.reviewCartDetails();


    this.checkoutFormGroup = this.formBuilder.group({

      customer:this.formBuilder.group({
        firstName:new FormControl('',[Validators.required,
                                      Validators.minLength(3),
        /* CustomFormValidator.notOnlyWhitespace  */       ]), // Adding the custom validation taaki name mai space na aa jae

        lastName: new FormControl('',[Validators.required,
                                      Validators.minLength(3)]),

        email: new FormControl ('',  [Validators.required,
                                      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")] ),
      }),

      shippingAddress: this.formBuilder.group({
        street:new FormControl('',[Validators.required,
                                  Validators.minLength(3)]),
        apartment:new FormControl('',[Validators.required,
                                      Validators.minLength(3)]),
        city:new FormControl('',[Validators.required,
                                 Validators.minLength(3)]),
        phone:new FormControl('',[Validators.required,
                                  Validators.minLength(10)]),
        state:new FormControl('',[Validators.required]), // DropDown and recommendation
        country:new FormControl('',[Validators.required]), // DropDown and recommendation
        zipCode:new FormControl('',[Validators.required,
                                    Validators.minLength(3)]),
      }),

      billingAddress:this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2)]),
        apartment:new FormControl('', [Validators.required, Validators.minLength(2)]),
        city: new FormControl('', [Validators.required, Validators.minLength(2)]), // Dropdown and recommendations
        phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
        state: new FormControl('', [Validators.required]), // DropDown and recommendation
        country:new FormControl('', [Validators.required]), // DropDown and recommendation
        zipCode:new FormControl('', [Validators.required, Validators.minLength(2)]),
      }),

      creditCard:this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard:  new FormControl('', [Validators.required, Validators.minLength(2)]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
        expirationMonth: new FormControl('', [Validators.required]),
        expirationYear: new FormControl('', [Validators.required]),
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
    console.log("Handling the submit button");
// Touching all fields triggers the display of the error messages
    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
    }

    // Now we will get the customer data from the checkoutFormGroup
    // We can Also modify according to our need to get the customer responses
    console.log(this.checkoutFormGroup.get('customer')?.value); // we have to use the dsafe navigation to target the customer in the form group to avoid the 'null Object' error
    console.log("The email address is: "+ this.checkoutFormGroup.get('customer')?.value.email); // We will get the user's email Id
    console.log("The Shipping Country,State and City is"+ this.checkoutFormGroup.get('this.shippingAddressCountry') + this.checkoutFormGroup.get('this.shippingAddressState') + this.checkoutFormGroup.get('this.shippingAddressCity'))
  }

  // Copying the Shipping data to billing Address
  copyShippingAddressToBillingAddress(event) {
     if(event.target.checked){
       this.checkoutFormGroup.controls['billingAddress']
       .setValue(this.checkoutFormGroup.controls['shippingAddress'].value)

       // bug fix for states
      // this.billingAddressStates = this.shippingAddressState;
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

    this.countryApi.getStateOnSelectedCountry(countryCode).subscribe(
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
