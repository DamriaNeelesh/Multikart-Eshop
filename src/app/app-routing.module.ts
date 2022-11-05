import { HttpClientModule } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BagComponent } from './bag/bag.component';
import { BlogHomePageComponent } from './blog-home-page/blog-home-page.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { CartComponent } from './cart/cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import { ProductListComponent } from './product-list/product-list.component';
import { JacketsComponent } from './productCategory/jackets/jackets.component';
import { PajamasComponent } from './productCategory/pajamas/pajamas.component';
import { ShirtsComponent } from './productCategory/shirts/shirts.component';
import { TopComponent } from './productCategory/top/top.component';
import { TshirtsComponent } from './productCategory/tshirts/tshirts.component';
import { ProductsingleComponent } from './productsingle/productsingle.component';
import { MenComponent } from './productType/men/men.component';
import { WomenComponent } from './productType/women/women.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  {path:"", component: HomeComponent },
  {path:"products/:product_id", component: ProductsingleComponent },
  {path:"cart", component: CartComponent},
  {path:"check-out", component:CheckoutComponent},
  {path:"checkout",component:CheckOutComponent},
  {path:"shop", component:ShopComponent},
  {path:"bag", component:BagComponent},
  {path:"product-list",component:ProductListComponent},
  {path:"blog-home", component:BlogHomePageComponent},
  {path:"blog/:id",component:BlogPostComponent},
  {path:"search/:keyword",component:ProductListComponent},
  {path:"checkout/:payment",component:PaymentGatewayComponent},

  {path:"men",component:MenComponent},
  {path:"women",component:WomenComponent},
  {path:"shirts",component:ShirtsComponent},
  {path:"tshirts",component:TshirtsComponent},
  {path:"top",component:TopComponent},
  {path:"jackets",component:JacketsComponent},
  {path:"pajamas",component:PajamasComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  HttpClientModule,
  SlickCarouselModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
