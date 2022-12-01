import { Component, OnInit } from '@angular/core';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from '../sso.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  // oktaSignin: any;
  constructor(
            //  @Inject(OKTA_AUTH) private oktaAuth: OktaAuth
             private oauthService:OAuthService ) {

    // this.oktaSignin = new OktaSignIn({
    //   logo: 'assets/images/logo.png',
    //   baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
    //   clientId: myAppConfig.oidc.clientId,
    //   redirectUri: myAppConfig.oidc.redirectUri,
    //   authParams: {
    //     pkce: true,
    //     issuer: myAppConfig.oidc.issuer,
    //     scopes: myAppConfig.oidc.scopes
    //   }
    // });
    this.configureSingleSignOn();
   }

   configureSingleSignOn(){
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
   }

   login(){
    this.oauthService.initImplicitFlow();
  }

  logout(){
   this.oauthService.logOut();
  }


  ngOnInit(): void {
    // this.oktaSignin.remove();

    // this.oktaSignin.renderEl({
    //   el: '#okta-sign-in-widget'}, // this name should be same as div tag id in login.component.html
    //   (response: any) => {
    //     if (response.status === 'SUCCESS') {
    //       this.oktaAuth.signInWithRedirect();
    //     }
    //   },
    //   (error: any) => {
    //     throw error;
    //   }
    // );
  }
}
