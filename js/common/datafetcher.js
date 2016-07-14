'use strict';
import OAuthUtil from './oauthutil';

function DataFetcher() {
  if (!(this instanceof DataFetcher)) {
    return new DataFetcher();
  }
}

DataFetcher.prototype.fetch = function(url, onSuccess, onFail) {
  OAuthUtil.getAccessToken(function(accessToken, accessTokenSecret) {
    var authorizationHeader = OAuthUtil.getAuthorizationHeader(url, true, accessToken, accessTokenSecret);
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': authorizationHeader
      }
    })
    .then((response) => {
      if (onSuccess instanceof Function) {
        onSuccess(response);
      }
    })
    .catch((error) => {
      if (onFail instanceof Function) {
        onFail(response);
      }
    });
  }, function(error) {
    console.log("Couldn't get accessToken, error: " + JSON.stringify(error));
    onFail(error);
  });
};

module.exports = DataFetcher;
