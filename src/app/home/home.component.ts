import { Component, OnInit } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { IProducts } from '../products';
import { CartapiService } from '../services/cartapi.service';
import { ContentfulService } from '../services/contentful.service';
import { ProductsService } from '../services/products.service';
import { Button } from 'primeng/button';
import { filter } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
    private _productsService: ProductsService) {
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

}
