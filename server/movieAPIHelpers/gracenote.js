var apiKeys = require('../../config/apiKeys');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const gracenote = {
  'api_key': 'kew4j86k7c8ckcuv6q3sbbsk',
  'uri': 'http://data.tmsapi.com/v1.1/movies/showings',
  'timeout': 5000,
  call: function(params, success, error) {

    var params_str = 'api_key=' + gracenote.api_key;
    for (var key in params) {
      if (params.hasOwnProperty(key)) {
        params_str += '&' + key + '=' + encodeURIComponent(params[key]);
      }
    }
    var xhr = new XMLHttpRequest();
    xhr.timeout = gracenote.timeout;
    xhr.ontimeout = function () {
      throw ('Request timed out: ' + url + ' ' + params_str);
    };
    console.log('the URL is ', gracenote.uri + '?' + params_str);
    xhr.open('GET', gracenote.uri + '?' + params_str, true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.responseType = 'json';
    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          if (typeof success == 'function') {
          	console.log('this request worked!');
          	console.log(xhr.responseText);
            success(xhr.responseText);
          } else {
            throw ('No success, but the request gave results');
          }
        } else {
          if (typeof error == 'function') {
            if (xhr.responseText !== undefined) {
              console.log('this request failed!');
              error(xhr.responseText);
            } else {
              console.log('this request failed (again)!');	
              error(xhr.responseText);
            }
          } else {
            throw ('No error callback');
          }
        }
      }
    };
    xhr.send();
  }
};

module.exports = gracenote;
// })()
