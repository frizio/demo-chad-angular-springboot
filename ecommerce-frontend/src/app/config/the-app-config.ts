export default {
  oidc: {
    clientId: '********************',                           // Public Identifier of the client app
    issuer: 'https://*********************/oauth2/default',     // Issues of the token. URL when authorizing with Okta Authorization Server
    redirectUri: 'http://localhost:4201/login/callback',        // Once user logs in... send them here
    scopes: ['openid', 'profile', 'email']                      // Scopes provide access to information about a user 
                                                                // * 'openid'  -> required for authentication requests, 
                                                                // * 'profile' -> user's first name, last name, phone, etc, 
                                                                // * 'email'   -> user's email address
  }
}
