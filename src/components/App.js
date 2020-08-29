import React, { Component } from 'react';
import '../assets/stylesheets/App.css';
import firebase, { auth, provider, database } from '../user/auth';
import GoogleButton from 'react-google-button'
import Courses from './Courses'
require('dotenv').config()

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      user: null,
    }
    this.login = this.login.bind(this); 
    this.logout = this.logout.bind(this);
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        if (result.credential) {
          var token = result.credential.accessToken;
          var userId = firebase.auth().currentUser.uid;
          firebase.database().ref('users/' + userId).set({
            access_token: token,
          });
          }
        
        const user = result.user;
        this.setState({
          user,
        });
      });
  }
  
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
  }
    
  render() {
    return (
      <div className='app'>
          
          {this.state.user ?
          
            
            <button onClick={this.logout}>Logout</button>       
            
          :
          <div className="wrapper">
          <div className="title">Google Classroom</div>
          <div className='subtitle'>Dark, Fast, and Light</div>
            <GoogleButton type="dark" className='vertical-center' onClick={this.login}/>    
            </div>
          }
        
      {this.state.user ?

      <div>
      <Courses />
    </div>
    :
    <div >
     
    </div>
  }
      </div>
    );
  }
}
export default App;