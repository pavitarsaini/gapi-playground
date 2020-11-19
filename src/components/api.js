import firebase, { auth, provider, database } from '../user/auth';

require('dotenv').config()
const axios = require('axios').default;
const fs = window.require('fs');

function getActiveDB(arry) {
  return new Promise(resolve => {
    var active = [];
    for (var i = 0; i < arry.length; i++) {
          if (arry[i].courseState == 'ACTIVE') {
              active[i] = arry[i];
          }
      }
      resolve(active)
  });
}

export async function getActive(arry) {
  var x = await getActiveDB(arry);
  return x;
}

function getTokenDB(uid) {
  return new Promise(resolve => {
      firebase.database().ref('/users/' + uid).once('value', snapshot => {
        var token = snapshot.val().access_token;
        resolve(token)
      })
  });
}

export async function getToken(uid) {
  var x = await getTokenDB(uid);
  return x;
}

function getCoursesDB(token){
  return new Promise(resolve => {
      axios.get('https://classroom.googleapis.com/v1/courses', {
    headers: {
      'Authorization': `Bearer ${token}`,
       },params: {
        pageSize: 10
    }
    })
    .then((res) => {
    var data = res.data
    resolve(data)
    })
    .catch((error) => {
      console.log()
        console.error(error)
    })
  });
}

export async function getCourses(token) {
  var x = await getCoursesDB(token);
  return x;
}

function getAnnouncementsDB(token, courseId){
  return new Promise(resolve => {
      axios.get(`https://classroom.googleapis.com/v1/courses/${courseId}/announcements/`, {
    headers: {
      'Authorization': `Bearer ${token}`,
       },params: {
        pageSize: 10
    }
    })
    .then((res) => {
    var data = res.data
    resolve(data)
    })
    .catch((error) => {
      console.log()
        console.error(error)
    })
  });
}

export async function getAnnouncements(token, courseId) {
  var x = await getAnnouncementsDB(token, courseId);
  return x;
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


export const loadData = () => {
  try {
    var obj = fs.readFileSync('test.json', 'utf8')
    return JSON.parse(obj)
  } catch (err) {
    console.error(err)
    return false
  }
}