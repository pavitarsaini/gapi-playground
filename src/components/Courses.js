import React, { Component } from 'react';
import '../assets/stylesheets/App.css';
import firebase, { auth, provider } from '../user/auth';
const {getData} = require("./api");

var app = window.require('electron').remote;
const fs = window.require('fs');

var courses={};
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      var userId = user.uid
      firebase.database().ref('/users/' + userId).on('value', function(snapshot) {
      var token = snapshot.val().access_token;
      console.log(token)
      test(token)
      });
      

  } 
});

function test(token) {
  getData(token, (res) => {
    courses = res.data.courses;    
    console.log(courses)
    fs.writeFileSync('./data.json', JSON.stringify(courses) , 'utf-8'); 
},(err) => {console.log(err);});}

//console.log(courses)
class Courses extends Component {    

    render() {
      return (
          <div>HI
            
              <button ></button>
          </div>
      );
    }
  }

  export default Courses;