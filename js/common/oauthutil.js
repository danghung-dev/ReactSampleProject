'use strict';
import OAuth from 'oauth-1.0a';

module.exports = {
  accessToken:       null,
  accessTokenSecret: null,
  configs:           require('./configs'),
  requests:          [],

  getAuthorizationHeader: function(url, isGet, accessToken, accessTokenSecret) {
    var oauth = OAuth(this.configs.oauth);
    var oauthData = oauth.authorize({
      url: this.getUrlWithoutPort(url) + '?oauth_token=' + accessToken,
      method: isGet ? 'GET' : 'POST'
    }, {
      public: accessToken,
      secret: accessTokenSecret
    });
    oauthData.oauth_token = accessToken;
    return oauth.toHeader(oauthData)['Authorization'];
  },

  getAccessToken: function(onSuccess, onFail, shouldUpdateToken) {
    if (!OAuth) {
      this.callOnFail(onFail, {
        error:   'Could not import oauth-1.0a module!',
        context: 'OauthUtil.getAccessToken'
      });
      return;
    }
    if (!shouldUpdateToken && this.accessToken && this.accessTokenSecret) {
      this.callOnSuccess(onSuccess, this.accessToken, this.accessTokenSecret);
      return;
    }
    if (!this.configs) {
      this.callOnFail(onFail, {
        error:   'Could not import configs module!',
        context: 'OauthUtil.getAccessToken'
      });
      return;
    }
    if (this.requests.push({onSuccess: onSuccess, onFail: onFail}) > 1) {
      // Access tokens retrieval for a previous request is currently ongoing,
      // it's unneccessary to start a new one for this request,
      // because all requests can share the same token
      return;
    }
    var urlConfigs = this.configs.oauth.url;
    var oauth = OAuth(this.configs.oauthWithAmpersandSeperator);
    var oauthData = oauth.authorize({
      url: urlConfigs.requestTokenWithoutPort,
      method: 'POST'
    }, null);
    fetch(urlConfigs.requestToken, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: this.getOauthRequestData(oauth, oauthData)
    })
    .then((response) => {
      if (!response) {
        this.notifyOnFail({
          error:   'response is undefined',
          context: 'OauthUtil.getAccessToken'
        });
        return;
      }
      var tokens = oauth.deParam(response["_bodyText"]);
      var requestToken = tokens["oauth_token"];
      var requestTokenSecret = tokens["oauth_token_secret"];
      console.log('-----Unauthorized Request Token-----\nRequest Token: ' + requestToken + "\nRequest Token Secret: " + requestTokenSecret);
      this.getAuthorization(requestToken, requestTokenSecret);
    })
    .catch((error) => {
      this.notifyOnFail({
        error:   error,
        context: 'OauthUtil.getAccessToken'
      });
    })
  },

  getAuthorization: function(requestToken, requestTokenSecret) {
    fetch(this.configs.oauth.url.authorizeAdmin + '?oauth_token=' + requestToken, {method: 'GET'})
    .then((response) => {
      if (!response) {
        this.notifyOnFail({
          error:   'response is undefined',
          context: 'OauthUtil.getAuthorization'
        });
        return;
      }
      var body = response["_bodyText"];
      var form = this.parseForm(body, true);
      var formUrl = form ? form.url : null;
      if (!formUrl) {
        this.notifyOnFail({
          error:   'formUrl is undefined',
          context: 'OauthUtil.getAuthorization'
        });
        return;
      }
      if (formUrl.indexOf('confirm') < 0) {
        this.postAdminLoginInfo(formUrl, form.isGet, form.key, requestToken, requestTokenSecret);
      } else {
        this.grantAuthorization(formUrl, form.isGet, requestToken, requestTokenSecret);
      }
    })
    .catch((error) => {
      this.notifyOnFail({
        error:   error,
        context: 'OauthUtil.getAuthorization'
      });
    })
  },

  postAdminLoginInfo: function(formUrl, isGet, formKey, requestToken, requestTokenSecret) {
    if (!formUrl) {
      this.notifyOnFail({
        error:   'formUrl is undefined',
        context: 'OauthUtil.postAdminLoginInfo'
      });
      return;
    }
    var postContent = this.configs.oauth.adminLogin + '&form_key=' + formKey + '&form_key=' + formKey + '&oauth_token=' + requestToken;
    var promise = isGet ?
    fetch(formUrl + '?' + postContent, {method: 'GET'})
    : fetch(formUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: postContent
    });
    promise.then((response) => {
      if (!response) {
        this.notifyOnFail({
          error:   'response is undefined',
          context: 'OauthUtil.postAdminLoginInfo'
        });
        return;
      }
      var body = response["_bodyText"];
      var form = this.parseForm(body, false);
      if (!form) {
        this.notifyOnFail({
          error: 'form is undefined',
          context: 'OauthUtil.postAdminLoginInfo'
        });
        return;
      }
      this.grantAuthorization(form.url, form.isGet, requestToken, requestTokenSecret);
    })
    .catch((error) => {
      this.notifyOnFail({
        error: error,
        context: 'OauthUtil.postAdminLoginInfo'
      });
    })
  },

  grantAuthorization: function(formUrl, isGet, requestToken, requestTokenSecret) {
    if (!formUrl) {
      this.notifyOnFail({
        error:   'Form url is undefined',
        context: 'OauthUtil.grantAuthorization'
      });
      return;
    }
    var postContent = 'oauth_token=' + requestToken;
    var promise = isGet ?
    fetch(formUrl + '?' + postContent, {method: 'GET'})
    : fetch(formUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: postContent
    });
    promise.then((response) => {
      if (!response) {
        this.notifyOnFail({
          error:   'response is undefined',
          context: 'OauthUtil.grantAuthorization'
        });
        return;
      }
      //console.log("response grantAuthorization:" + JSON.stringify(response));
      var oauthVerifier;
      var callback = response["url"];
      var splitted = callback.split("oauth_verifier=");
      if (splitted && splitted.length > 1) {
        oauthVerifier = splitted[1];
        var index = oauthVerifier ? oauthVerifier.indexOf('&') : -1;
        if (index >= 0) {
          oauthVerifier = oauthVerifier.substring(0, index);
        }
      } else {
        splitted = callback.split("index/key/");
        if (splitted && splitted.length > 1) {
          oauthVerifier = splitted[1];
          var index = oauthVerifier ? oauthVerifier.indexOf('/') : -1;
          if (index >= 0) {
            oauthVerifier = oauthVerifier.substring(0, index);
          }
        }
      }
      console.log("-----Authorization Granted-----\nRequest Token: " + requestToken + "\nRequest Token Verifier: " + oauthVerifier);
      this.requestAccessToken(requestToken, requestTokenSecret, oauthVerifier);
    })
    .catch((error) => {
      this.notifyOnFail({
        error:    error,
        context: 'OauthUtil.grantAuthorization'
      });
    })
  },

  requestAccessToken: function(requestToken, requestTokenSecret, requestTokenVerifier) {
    if (!requestToken || !requestTokenSecret || !requestTokenVerifier) {
      this.notifyOnFail({
        error:   'requestToken, requestTokenSecret or requestTokenVerifier is undefined',
        context: 'OauthUtil.requestAccessToken'
      });
      return;
    }
    var urlConfigs = this.configs.oauth.url;
    var oauth = OAuth(this.configs.oauthWithAmpersandSeperator);
    var oauthData = oauth.authorize({
      url: urlConfigs.accessTokenWithoutPort + '?oauth_token=' + requestToken + "&oauth_verifier=" + requestTokenVerifier,
      method: 'POST'
    }, {
      public: requestToken,
      secret: requestTokenSecret
    });
    oauthData.oauth_token = requestToken;
    oauthData.oauth_verifier = requestTokenVerifier;
    fetch(urlConfigs.accessToken, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: this.getOauthRequestData(oauth, oauthData)
    })
    .then((response) => {
      if (!response) {
        this.notifyOnFail({
          error:   'response is undefined',
          context: 'OauthUtil.requestAccessToken'
        });
        return;
      }
      //console.log("response get acess token:" + JSON.stringify(response));
      var tokens = oauth.deParam(response["_bodyText"]);
      var accessToken = tokens["oauth_token"];
      var accessTokenSecret = tokens["oauth_token_secret"];
      console.log('-----Access Token-----\nAccess Token: ' + accessToken + "\nAccess Token Secret: " + accessTokenSecret);
      this.accessToken = accessToken;
      this.accessTokenSecret = accessTokenSecret;
      this.notifyOnSuccess(accessToken, accessTokenSecret);
    })
    .catch((error) => {
      this.notifyOnFail({
        error:   error,
        context: 'OauthUtil.requestAccessToken'
      });
    })
  },

  parseForm: function(body, parseKey) {
    var form = {
      url:    null,
      isGet:  false,
      key:    null
    };
    if (!body) {
      return form;
    }

    var splitted = body.split('action="');
    var formUrl = splitted && splitted.length > 1 ? splitted[1] : null;
    var index = formUrl ? formUrl.indexOf('"') : -1;
    if (index >= 0) {
      formUrl = formUrl.substring(0, index);
    }
    form.url = formUrl;

    splitted = body.split('method="');
    var method = splitted && splitted.length > 1 ? splitted[1] : null;
    index = method ? method.indexOf('"') : -1;
    if (index >= 0) {
      method = method.substring(0, index);
    }
    form.isGet = !method || method.toUpperCase() === 'GET';

    if (parseKey) {
      splitted = body.split("FORM_KEY = '");
      var formKey = splitted && splitted.length > 1 ? splitted[1] : null;
      index = formKey ? formKey.indexOf("'") : -1;
      if (index >= 0) {
        formKey = formKey.substring(0, index);
      }
      form.key = formKey;
    }
    return form;
  },

  notifyOnSuccess: function(accessToken, accessTokenSecret) {
    this.requests.reverse();
    while (this.requests.length > 0) {
      var request = this.requests.pop();
      if (request) {
        this.callOnSuccess(request.onSuccess, accessToken, accessTokenSecret);
      }
    }
  },

  notifyOnFail: function(error) {
    if (error && this.configs.debugLogEnabled) {
      console.log(error.error + "(In " + error.context + ")");
    }
    this.requests.reverse();
    while (this.requests.length > 0) {
      var request = this.requests.pop();
      if (request) {
        this.callOnFail(request.onFail, error, true);
      }
    }
  },

  callOnSuccess: function(onSuccess, accessToken, accessTokenSecret) {
    if (!this.isCallable(onSuccess)) {
      return;
    }
    onSuccess(accessToken, accessTokenSecret);
  },

  callOnFail: function(onFail, error, disableLogging) {
    if (!disableLogging && error && this.configs.debugLogEnabled) {
      console.log(error.error + "(In " + error.context + ")");
    }
    if (!this.isCallable(onFail)) {
      return;
    }
    onFail(error);
  },

  isCallable: function(obj) {
    return obj instanceof Function;
  },

  getUrlWithoutPort: function(url) {
    if (!url) {
      return url;
    }
    var splitted = url.split(':');
    if (!splitted || splitted.length < 3) {
      return url;
    }
    const beforePort = splitted[0] + ':' + splitted[1];
    var index = splitted[2] ? splitted[2].indexOf('/') : -1;
    if (index < 0) {
      return beforePort;
    }
    return beforePort + splitted[2].substring(index);
  },

  getOauthRequestData: function(oauth, oauthData) {
    if (!oauth || !oauthData) {
      return null;
    }
    return JSON.stringify(oauth.toHeader(oauthData)['Authorization']).substring('OAuth '.length).replace(/\\\"|\"/g, '');
  }
};
