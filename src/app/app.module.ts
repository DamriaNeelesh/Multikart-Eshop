import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ProductsingleComponent } from './productsingle/productsingle.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShopComponent } from './shop/shop.component';
import { BagComponent } from './bag/bag.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ToastRef, ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BarRatingModule } from 'ngx-bar-rating';
import { FilterPipe } from './filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortPipePipe } from './sort-pipe.pipe';
import { ProductsService } from './services/products.service';
import { ContentfulService } from './services/contentful.service';
import { BlogHomePageComponent } from './blog-home-page/blog-home-page.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { MdToHtmlPipe } from './md-to-html.pipe';
import { CarouselComponent } from './carousel/carousel.component';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ButtonModule} from 'primeng/button';
import {CarouselModule} from 'primeng/carousel';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CartStatusComponent } from './cart-status/cart-status.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import { CommonModule } from '@angular/common';
import { FormService } from './services/form.service';
import { CustomFormValidator } from './models/custom-form-Validator';
import { WomenComponent } from './productType/women/women.component';
import { ShirtsComponent } from './productCategory/shirts/shirts.component';
import { TshirtsComponent } from './productCategory/tshirts/tshirts.component';
import { TopComponent } from './productCategory/top/top.component';
import { JacketsComponent } from './productCategory/jackets/jackets.component';
import { PajamasComponent } from './productCategory/pajamas/pajamas.component';
import { MenComponent } from './productType/men/men.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductsingleComponent,
    CartComponent,
    CheckoutComponent,
    ShopComponent,
    BagComponent,
    ProductListComponent,
    FilterPipe,
    SortPipePipe,
    BlogHomePageComponent,
    BlogPostComponent,
    MdToHtmlPipe,
    CarouselComponent,
    CartStatusComponent,
    CheckOutComponent,
    PaymentGatewayComponent,
    MenComponent,
    WomenComponent,
    ShirtsComponent,
    TshirtsComponent,
    TopComponent,
    JacketsComponent,
    PajamasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BarRatingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgbCarouselModule,
    ButtonModule,
    CarouselModule,
    CommonModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot()
  ],
  providers: [ProductsService,ContentfulService,FormService,CustomFormValidator,ToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
