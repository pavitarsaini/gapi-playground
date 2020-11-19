import React, { Component } from 'react';
import '../assets/stylesheets/App.css';
import firebase, { auth, provider, database } from '../user/auth';
import GoogleButton from 'react-google-button'
import Courses from './Courses'
const { ipcRenderer } = window.require('electron')

require('dotenv').config()
class App extends Component {
  
  constructor() {
    super();
    this.state = {
      username: '',
      user: null,
      photoURL: ''
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
          let data = { 
            name: firebase.auth().currentUser.displayName,
            uid: firebase.auth().currentUser.uid,
            photoURL: firebase.auth().currentUser.photoURL
        };

          ipcRenderer.on('fileSave-reply', (event, arg) => {
        console.log(arg)})
          ipcRenderer.send('fileSave-message', JSON.stringify(data))

          firebase.database().ref('users/' + userId).set({
            access_token: token,
          });
          }
        const user = result.user;
        this.setState({
          user,
          photoURL: result.user.photoURL
        });
      });
  }
  
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user , photoURL: user.photoURL});
      } 
    });

    //var config = JSON.parse(ipcRenderer.sendSync('getUid-message', ''))
    //var uid = await config.uid;

    //if(uid === "")
  }
    
  render() {
    return (
      <div className={"back"}>
          
          {this.state.user ?
          <div>
          <div className={"topbar"}>                            
            <button className={"logout"} onClick={this.logout}> <img className={"photoURL"} src={this.state.photoURL}/> </button>    
            </div>
            <div className={"sidebar"}>   
            <button className={"sidebar-button"}>HI</button>     
            <button className={"sidebar-element"}>HI</button>     
                               
            </div>
            </div>
          :
          <div className='app'>
          <div className="wrapper">
          <div className="title">Google Classroom</div>
          <div className='subtitle'>Dark, Fast, and Light</div>
            <GoogleButton type="dark" className='vertical-center' onClick={this.login}/>    
            </div>
            </div>
          }
      
      {this.state.user ?
      
      <Courses />
      
    :
    <div >
    </div>
  }
      
      </div>
    );
  }
}
export default App;