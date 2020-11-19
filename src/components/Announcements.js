import React, {Component} from 'react';
import '../assets/stylesheets/App.css';
import '../assets/stylesheets/Announcements.css';
import {getToken, getAnnouncements} from './api'
import firebase, {auth, provider} from '../user/auth';
//import courses from '../data.json';

require('dotenv').config()
//var app = window.require('electron');
const {ipcRenderer} = window.require('electron')
const fs = window.require('fs');

class Announcements extends Component {

    constructor(props) {
        super(props);
        this.state = {
            announcements: [],
            photoURL: ''
        }
    }

    async componentDidMount() {
        var config = JSON.parse(ipcRenderer.sendSync('getUid-message', ''))
        var uid = await config.uid;
        var token = await getToken(uid)
        console.log(token);

        const courseId = this.props.courseId;

        var announcements = await getAnnouncements(token, courseId)
        console.log(announcements.announcements)
        this.setState({announcements: announcements.announcements})

        
    }

    renderItems = () => {
        const data = this.state.announcements;
        const mapRows = data.map((item, index) => (
            <div key={item.id} className={"announcement"}>
                {/* Passing unique value to 'key' prop, eases process for virtual DOM to remove specific element and update HTML tree  */}
                <div className={"announcement-header"}>
                    <a href={"#"}>
                        <div className={"announcement-name"} >{item.text}</div>
                    
                    </a>
                </div>
            </div>
        ));
        return mapRows;
    };


    render() {
        return (
            <div className={"announcements"}>
                <div className={"announcements-container"}>
                {this.renderItems()}
                </div>
            </div>
        );
    }
}

export default Announcements;