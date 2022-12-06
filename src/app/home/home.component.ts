import { Component, OnInit } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { IProducts } from '../products';
import { CartapiService } from '../services/cartapi.service';
import { ContentfulService } from '../services/contentful.service';
import { ProductsService } from '../services/products.service';
import { Button } from 'primeng/button';
import { filter, interval, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private subscription?: Subscription;
  
    public dateNow = new Date('Nov 7 2022 00:00:00');
    public dDay = new Date('Dec 31 2022 03:00:00');
    milliSecondsInASecond = 1000;
    hoursInADay = 24;
    minutesInAnHour = 60;
    SecondsInAMinute  = 60;

    public timeDifference;
    public secondsToDday;
    public minutesToDday;
    public hoursToDday;
    public daysToDday;

    private getTimeDifference () {
      this.timeDifference = this.dDay.getTime() - new  Date().getTime();
      this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits (timeDifference) {
    this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
    this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
    this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
    this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
}



  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  filterCaraousel = {
    'Men':false,
    'Women':false,
    // 'Shirts':false,
    // 'TShirts':false,
  }

  products: IProducts[] = [];
  responsiveOptions;
  filteredProducts : IProducts[] = [];
  constructor(private apiService: CartapiService,
    private _productsService: ProductsService,
    private toastr:ToastrService) {
      this.responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
      ]
     }


  ngOnInit(): void {
    this.products = this._productsService.getProducts();
    this.filteredProducts = this._productsService.getProducts();

    this.subscription = interval(1000)
  .subscribe(x => { this.getTimeDifference(); });
  }

  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1} ;

  filter(category: string) {
    this.filteredProducts = this.products
      .filter((a: any) => {
        if (a.product_category === 'Women') {
          return a;
        }
      })
  }

  addToCart(product: IProducts) {
    this.apiService.addToCart(product);
    console.log(`Adding to Cart: ${product.product_name} Price: Rs. ${product.product_price}`);
    // this.toastr.success('Product has been added to cart Successfully!!');
    // localStorage.setItem('product',JSON.stringify(this.products));
  }


}
