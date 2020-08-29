### Example 1: Using the request header

```js
var user = gapi.auth2.getAuthInstance().currentUser.get();
var oauthToken = user.getAuthResponse().access_token;
var xhr = new XMLHttpRequest();
xhr.open('GET',
  'https://people.googleapis.com/v1/people/me/connections');
xhr.setRequestHeader('Authorization',
  'Bearer ' + oauthToken);
xhr.send();
```
