import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartapiService } from 'src/app/services/cartapi.service';
import { ProductsService } from 'src/app/services/products.service';
import { IProducts } from 'src/products';

@Component({
  selector: 'app-hrx',
  templateUrl: './hrx.component.html',
  styleUrls: ['./hrx.component.css']
})
export class HRXComponent implements OnInit {

  constructor(private apiService: CartapiService,
    private _productsService: ProductsService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService) { }

  products: IProducts[] = [];
  filteredProducts?: IProducts[] = [];
  searchText!: string;

  ngOnInit(): void {
    this.products = this._productsService.getProducts();
    this.filteredProducts = this._productsService.getProducts();
  }

  addToCart(product: IProducts) {
    this.apiService.addToCart(product);
    console.log(`Adding to Cart: ${product.product_name} Price: Rs. ${product.product_price}`);
    this.toastr.success('Product has been added to cart Successfully!!');
  }
}
