import firebase, { auth, provider, database } from '../user/auth';

require('dotenv').config()
let app = require('./App');
const axios = require('axios').default;

export function getToken(uid){
  return firebase.database().ref('/users/' + uid).on('value', function(snapshot) {
    var token = snapshot.val().access_token;
    //return uid
    //console.log(token)
    //return token
});

}

export function getCourses(token){
  axios.get('https://classroom.googleapis.com/v1/courses', {
    headers: {
      'Authorization': `Bearer ${token}`,
       },params: {
        pageSize: 10
    }
    })
    .then((res) => {
    var data = res.data
    return data;
     console.log(data)
    })
    .catch((error) => {
      console.log()
        console.error(error)
    })
}

export function getData(token, callback, errorcallback){
  axios.get('https://cors-anywhere.herokuapp.com/https://classroom.googleapis.com/v1/courses', {
    headers: {
      'Authorization': `Bearer ${token}`
       },params: {
        pageSize: 10
    }
    })
  .then(res => {
    //do something
    if(callback != null){
       callback(res);
    }
  })
  .catch(err => {
    // catch error
    if(errorcallback != null){
       errorcallback(err);
    }
  })
}
