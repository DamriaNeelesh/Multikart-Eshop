import { Component, OnInit } from '@angular/core';
import { OAuthService} from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from '../sso.config';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {


 constructor( private oauthService:OAuthService){
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

get token(){
  let claims:any = this.oauthService.getIdentityClaims();
  return claims ? claims : null;
}

ngOnInit(): void {
}

}

