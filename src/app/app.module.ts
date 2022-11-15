import { Injector, NgModule } from '@angular/core';
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
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { CustomFilterPipe } from './custom-filter.pipe';
import { CountdownTimerComponent } from './countdown-timer/countdown-timer.component';
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
import { LoginComponent } from './login/login.component';
import { Router } from '@angular/router';
import { LoginStatusComponent } from './login-status/login-status.component';

import myAppConfig from './config/my-app-config';
import { OktaAuthModule, OKTA_CONFIG , OktaCallbackComponent} from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { OAuthModule } from 'angular-oauth2-oidc';
import { BeautyComponent } from './beauty/beauty.component';


const oktaConfig = myAppConfig.oidc;

const oktaAuth = new OktaAuth(oktaConfig);

function sendToLoginPage(oktaAuth: OktaAuth, injector: Injector) {
  // Use injector to access any service available within your application
  const router = injector.get(Router);

  // Redirect the user to your custom login page
  router.navigate(['/login']);
}



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
    CustomFilterPipe,
    CountdownTimerComponent,
    // Brand Component
    CantabilComponent,DenimComponent,DennisLingoComponent,HereComponent,
    HighlanderComponent,HRXComponent,LevisComponent,MastHarbourComponent,
    MuftiComponent,RoadsterComponent,WrognComponent,ZaraComponent, LoginComponent,

    LoginStatusComponent,
     OrderHistoryComponent,
     BeautyComponent
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
    ToastrModule.forRoot(),
    OktaAuthModule,
    OAuthModule,
  ],
  bootstrap: [AppComponent],
  providers: [ProductsService, ContentfulService, FormService, CustomFormValidator, ToastrService,
    {provide :HTTP_INTERCEPTORS ,   // token for HTTP interceptor
    useClass:AuthInterceptorService, // Register our AuthenticationService as an HTTP interceptor
     multi:true}  // Informs Angular that HTTP_INTERCEPTOR is a token for injecting an array of values
    ], 
  
  
})
export class AppModule { }
