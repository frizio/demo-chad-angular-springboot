export default {
  oicd {
    clientId: '',                                               // Public Identifier of the client app
    issuer: '',                                                 // Issues of the token. URL when authorizing with Okta Authorization Server
    redirectUri: '',                                            // Once user logs in... send them here
    scopes: []                                                  // Scopes provide access to information about a user 
                                                                // * 'openid'  -> required for authentication requests, 
                                                                // * 'profile' -> user's first name, last name, phone, etc, 
                                                                // * 'email'   -> user's email address
  }
}
