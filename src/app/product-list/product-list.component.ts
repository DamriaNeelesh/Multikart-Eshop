import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProducts } from '../products';
import { CartapiService } from '../services/cartapi.service';
import { ProductsService } from '../services/products.service';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchAll } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  // @Input() Num = []; Isse mere paas faltu ka error aa gya tha

  filter = {
    Men: false,
    Shirt: false,
    TShirts: false,
    Women: false,
    Top: false,
    Blazers: false,
    Jackets: false,
    Denim: false,
    WROGN: false,
    ZARA: false,
    HIGHLANDER: false,
    Levis: false,
    Roadster: false,
    HRX: false,
    Mufti: false,
    Cantabil: false,
    'Here&Now': false,
    'Mast & Harbour': false,
    'Dennis Lingo': false,

  };

 

  products: IProducts[] = [];
  searchProducts?: IProducts[] = [];
  filteredProducts ?: IProducts[] = [] ;
  currentCategoryId:number | undefined;
  searchMode:boolean | undefined;
  selectedProduct;
  theKeyword?:string | null; 

  constructor(private apiService: CartapiService,
    private _productsService: ProductsService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router:Router,
    private toastr:ToastrService) {}


  ngOnInit() {
    this.products = this._productsService.getProducts();
    this.filteredProducts = this._productsService.getProducts();
  }

  listProducts(){
    this.searchMode=this.route.snapshot.paramMap.has('keyword');
    this.handleListProducts();
    if(this.searchMode){
      this.handleSearchProducts();
    }
    else{
      this.handleListProducts();
    }
  }

  doSearch(value:string){
    console.log(`value=${value}`);
    this.router.navigateByUrl(`/search/${value}`);
  }

  handleSearchProducts(){
     this.theKeyword = this.route.snapshot.paramMap.get('keyword');
      // Now search for the prodcurs using the keyword
    this._productsService.searchProducts('theKeyword').subscribe(
      data => {
        this.searchProducts = data;
      }
    );
  }

  handleListProducts(){
    // Check if 'id' parameter is available
  }

  filterChange() {
    console.log(this.filter)
    // this.filteredProducts = [];
    this.filteredProducts = this.products.filter(x =>
      (x.product_name === 'WROGN' && this.filter.WROGN)
      || (x.product_name === 'ZARA' && this.filter.ZARA)
      || (x.product_name === 'Denim' && this.filter.Denim)
      || (x.product_name === 'HIGHLANDER' && this.filter.HIGHLANDER)
      || (x.product_name === 'Levis' && this.filter.Levis)
      || (x.product_name === 'Here&Now' && this.filter['Here&Now'])
      || (x.product_name === 'Mast & Harbour' && this.filter['Mast & Harbour'])
      || (x.product_name === 'Roadster' && this.filter.Roadster)
      || (x.product_name === 'HRX' && this.filter.HRX)
      || (x.product_name === 'Mufti' && this.filter.Mufti)
      || (x.product_name === 'Dennis Lingo' && this.filter['DennisLingo'])
      || (x.product_name === 'Cantabil' && this.filter.Cantabil)
      || (x.product_category_type === 'Shirt' && this.filter.Shirt)
      || (x.product_category_type === 'TShirts' && this.filter.TShirts)
      || (x.product_category_type === 'Top' && this.filter.Top)
      || (x.product_category_type === 'Jackets' && this.filter.Jackets)
      || (x.product_category_type === 'Blazers' && this.filter.Blazers)
      || (x.product_category === 'Men' && this.filter.Men)
      || (x.product_category === 'Ladies' && this.filter.Women)
    );
    return this.filteredProducts;
  }



  addToCart(product: IProducts) {
    this.apiService.addToCart(product);
    console.log(`Adding to Cart: ${product.product_name} Price: Rs. ${product.product_price}`);
    this.toastr.success('Product has been added to cart Successfully!!');

  }

  view(product: IProducts) {
    alert(product.product_description)
  }



}





  // checkboxArray: any = [
  //   {
  //     id: 1, type: "checkbox", filter: 'Men', value: 'product_category'
  //   },
  //   {
  //     id: 2, type: "checkbox", filter: 'Women', value: 'product_category'
  //   },
  //   {
  //     id: 3, type: "checkbox", filter: 'Shirts', value: 'product_category_type'
  //   },
  //   {
  //     id: 4, type: "checkbox", filter: 'TShirts', value: 'product_category_type'
  //   },
  //   {
  //     id: 5, type: "checkbox", filter: 'Top', value: 'product_category_type'
  //   },
  //   {
  //     id: 6, type: "checkbox", filter: 'Jackets', value: 'product_category_type'
  //   },
  //   {
  //     id: 5, type: "checkbox", filter: 'Pajamas', value: 'product_category_type'
  //   },

  // ]




  // Upr jo dusri hamne cartApi service banai hai wo addToCart ke liye hai


