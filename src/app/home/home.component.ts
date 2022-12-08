import { Component, OnInit, TemplateRef } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { IProducts } from '../products';
import { CartapiService } from '../services/cartapi.service';
import { ContentfulService } from '../services/contentful.service';
import { ProductsService } from '../services/products.service';
import { Button } from 'primeng/button';
import { filter, interval, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import '@angular/localize/init';

@Component({
  selector: 'app-home',
  template:`
  <ng-template #mymodal let-modal>
  <div class="modal-header" style="background-color:#fb5c42;">
    <h4 class="modal-title" id="modal-basic-title">Welcome To NeelShop</h4>
    <button type="button" class="close" aria-label="Close" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">×</span>
    </button>
  </div>
  <div class="modal-body">
    <div class="imgBx">
      <img src="assets/images/gift.png">
    </div>
    <div class="content">
      <div>
      <h2>Special Offer</h2>
      <h3>Upto. 50<sup>%</sup><span>Off</span></h3>
      <p>Big Billion Winter Sale HURRY UP!!!</p>
      <a href="">Get The Deal Right Now</a>
    </div>
    </div>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-dark" (click)="modal.close('Save click')">Ok</button>
  </div>
</ng-template>`,
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
    closeResult?: string;
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
  constructor(private apiService: CartapiService, private modalService:NgbModal,
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

    getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }

    open(content:any) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        console.log(result)
        this.closeResult = `Closed with: ${result}`;
        console.log(this.closeResult);
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log(this.closeResult);

      });
    }


  ngOnInit(): void {
    this.products = this._productsService.getProducts();
    this.filteredProducts = this._productsService.getProducts();
    
    const myModal = document.getElementById('mymodal');
    console.log(document, 'chetan', myModal);

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
