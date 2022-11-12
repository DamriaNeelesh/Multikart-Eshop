import { Injectable } from '@angular/core';
import OktaSignIn from '@okta/okta-signin-widget';

@Injectable({
  providedIn: 'root'
})
export class Okta {
  widget;

  constructor() {
    this.widget = new OktaSignIn({
      logo:'assets/images/logo.png',
      baseUrl: 'https://localhost:4200/',
      clientId: '0oa7813bx2t9ukEk75d7',
      issuer:'https://dev-23535757.okta.com/oauth2/default',
      redirectUri:'https://localhost:4200/',
      scopes:['openid','profile','email']
    });
  }

  getWidget() {
    return this.widget;
  }
}
