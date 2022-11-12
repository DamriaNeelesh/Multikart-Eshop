import { HttpClientModule } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BagComponent } from './bag/bag.component';
import { BlogHomePageComponent } from './blog-home-page/blog-home-page.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { CantabilComponent } from './brands/cantabil/cantabil.component';
import { DenimComponent } from './brands/denim/denim.component';
import { DennisLingoComponent } from './brands/dennis-lingo/dennis-lingo.component';
import { HereComponent } from './brands/here/here.component';
import { HighlanderComponent } from './brands/highlander/highlander.component';
import { HRXComponent } from './brands/hrx/hrx.component';
import { LevisComponent } from './brands/levis/levis.component';
import { MastHarbourComponent } from './brands/mast-harbour/mast-harbour.component';
import { MuftiComponent } from './brands/mufti/mufti.component';
import { RoadsterComponent } from './brands/roadster/roadster.component';
import { WrognComponent } from './brands/wrogn/wrogn.component';
import { ZaraComponent } from './brands/zara/zara.component';
import { CartComponent } from './cart/cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
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

// Login and logout using OKTA Integration  
  {path:"", component: OktaCallbackComponent},
  {path:'login',component:LoginComponent},

// Product by Category
  {path:"men",component:MenComponent},
  {path:"women",component:WomenComponent},
  {path:"shirts",component:ShirtsComponent},
  {path:"tshirts",component:TshirtsComponent},
  {path:"top",component:TopComponent},
  {path:"jackets",component:JacketsComponent},
  {path:"blazers",component:PajamasComponent},
  
// Product by Brands
  {path:"cantabil",component:CantabilComponent},
  {path:"denim",component:DenimComponent},
  {path:"dennis-lingo",component:DennisLingoComponent},
  {path:"here&Now",component:HereComponent},
  {path:"highlander",component:HighlanderComponent},
  {path:"hrx",component:HRXComponent},
  {path:"levis",component:LevisComponent},
  {path:"mast&harbour",component:MastHarbourComponent},
  {path:"mufti",component:MuftiComponent},
  {path:"roadster",component:RoadsterComponent},
  {path:"wrogn",component:WrognComponent},
  {path:"zara",component:ZaraComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'}), 
  HttpClientModule,
  SlickCarouselModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
