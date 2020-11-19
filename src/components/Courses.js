import React, {Component} from 'react';
import '../assets/stylesheets/App.css';
import '../assets/stylesheets/Courses.css';
import {getToken, getCourses, getActive} from './api'
import Announcements from './Announcements'
import firebase, {auth, provider} from '../user/auth';
//import courses from '../data.json';

require('dotenv').config()
//var app = window.require('electron');
const {ipcRenderer} = window.require('electron')
const fs = window.require('fs');

class Courses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            photoURL: '',
            CoursePage: false,
            courseId: '',
        }
    }

    async componentDidMount() {
        var config = JSON.parse(ipcRenderer.sendSync('getUid-message', ''))
        var uid = await config.uid;
        console.log(uid);
        var token = await getToken(uid)
        console.log(token);
        var courses = await getCourses(token)
        console.log(courses)
        var active = await getActive(courses.courses)
        console.log(active)
        this.setState({courses: active})
    }

    renderItems = () => {
        const data = this.state.courses;
        const mapRows = data.map((item, index) => (
            <div key={item.id} className={"course"}>
                {/* Passing unique value to 'key' prop, eases process for virtual DOM to remove specific element and update HTML tree  */}
                <div className={"course-header"}>
                    <a href={"#"} onClick={() => {{this.setState({CoursePage: true, courseId: item.id,})}}}>
                        <div className={"course-name"} >{item.name}</div>
                        <div className={"course-section"}>{item.section}
                            &bull; {item.room}</div>
                    </a>
                </div>
            </div>
        ));
        return mapRows;
    };

    render() {
      if(this.state.CoursePage){
        return (
              <Announcements courseId={this.state.courseId}/>
        );
      }
        else {
          return (
            <div className={"courses"}>
                <div className={"courses-container"}>
                {this.renderItems()}
                </div>
            </div>
        );
        }
    }
}

export default Courses;