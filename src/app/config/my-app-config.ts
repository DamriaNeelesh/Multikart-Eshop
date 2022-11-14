export default{
    oidc:{
        logo:'assets/images/logo.png',
      // baseUrl: 'https://localhost:4200/',
      clientId: '0oa7813bx2t9ukEk75d7',
      issuer:'https://dev-23535757.okta.com/oauth2/default',
      redirectUri: 'http://localhost:4200/login/callback',
      scopes:['openid','profile','email'],
    }
    
}