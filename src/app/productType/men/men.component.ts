import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartapiService } from 'src/app/services/cartapi.service';
import { ProductsService } from 'src/app/services/products.service';
import { IProducts } from 'src/app/products';

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.css']
})
export class MenComponent implements OnInit {

  constructor(private apiService: CartapiService,
              private _productsService: ProductsService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router:Router,
              private toastr:ToastrService) { }

  products: IProducts[] = [];
  filteredProducts ?: IProducts[] = [] ;


  ngOnInit(): void {

  }

}
