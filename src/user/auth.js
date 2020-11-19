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

export const provider = new firebase.auth.GoogleAuthProvider().addScope('https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.announcements').setCustomParameters({prompt: 'select_account'});
export const auth = firebase.auth();
export const database = firebase.database();
export default firebase;