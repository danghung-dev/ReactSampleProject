'use strict';
import OAuth from 'oauth-1.0a';

module.exports = {
  debugLogEnabled: true,
  server: {
    // host: '192.168.71.170',
    // port: '8889',
    host: 'magedev.hayasw.com',
    port: '80'
  },
  oauth: {
    adminLogin: 'login[username]=admin&login[password]=waewaewae1',
    url: {
      //callback: 'http://192.168.71.170:8889/oauth_verifier.php'
       callback: 'http://magedev.hayasw.com/oauth_verifier.php'
    },
    consumer: {
      // public: '29390c9370fd7b67b81e763175c6bb84',
      // secret: '40b1ee14a4346fc4f52be0f6389e916a'
      public: 'bef010c6503bcc30f4be684bf1c05c84',
      secret: '03948a3f6da5ed08af0f902472ad4080'
    },
    signature_method: 'HMAC-SHA1'
  },
  init: function() {
    var baseUrlWithoutPort = 'http://' + this.server.host;
    var baseUrl = baseUrlWithoutPort + (!this.server.port || this.server.port === '80' ? '' : ':' + this.server.port);
    this.server.baseUrl = baseUrl;
    this.oauth.url.requestTokenWithoutPort = baseUrlWithoutPort + '/oauth/initiate?oauth_callback=' + encodeURIComponent(this.oauth.url.callback);
    this.oauth.url.requestToken = baseUrl + '/oauth/initiate';
    this.oauth.url.authorizeUser = baseUrl + '/oauth/authorize';
    this.oauth.url.authorizeAdmin = baseUrl + '/admin/oauth_authorize';
    this.oauth.url.accessTokenWithoutPort = baseUrlWithoutPort + '/oauth/token';
    this.oauth.url.accessToken = baseUrl + '/oauth/token';
    this.oauth.url.products = baseUrl + '/api/rest/products';
    var oauthData = OAuth(this.oauth);
    this.oauthWithAmpersandSeperator = oauthData.mergeObject(oauthData, {
      parameter_seperator: '&'
    });
    return this;
  }
}.init();
