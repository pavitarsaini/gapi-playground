var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
require('firebase/database');

var firebaseConfig = {
  apiKey: "AIzaSyCMTVttEQVfvWhWOO_U9djImp32S9fMh1Q",
  authDomain: "quickstart-1598232955696.firebaseapp.com",
  databaseURL: "https://quickstart-1598232955696.firebaseio.com",
  projectId: "quickstart-1598232955696",
  storageBucket: "quickstart-1598232955696.appspot.com",
  messagingSenderId: "294212710793",
  appId: "1:294212710793:web:b51347ddafea1cb7ad7158",
  measurementId: "G-M7PZN347JD"
};

firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider().addScope('https://www.googleapis.com/auth/classroom.courses').setCustomParameters({prompt: 'select_account'});
export const auth = firebase.auth();
export const database = firebase.database();
export default firebase;

/*
export const firestore = firebase.firestore();
export const auth = firebase.auth();
export default firebase;
export const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});
provider.addScope('https://www.googleapis.com/auth/contacts');

firebase.auth().useDeviceLanguage();

export const signInWithGoogle = () => firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  console.log(user.email);
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
  
});

export const signOut = () => firebase.auth().signOut().then(function() {
  // Sign-out successful.
  console.log("DONE");
}).catch(function(error) {
  // An error happened.
});

console.log(firebase.auth().onAuthStateChanged)
firebase.auth().onAuthStateChanged(user => {
  if(user) {
      console.log('User Logged in :' + user.data );
      //window.location.href ='event_list.html'
  }else{
      console.log('User Not Logged in'  + user);
      //window.location.href = 'index.html';
  }
});
*/