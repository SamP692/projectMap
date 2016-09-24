import React, { Component } from 'react';
// import { withRouter } from 'react-router';
import request from 'superagent';
import firebase from '../../firebase.config.js';
import Project from './project.jsx';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
    };
  }
  createNewProject() {
    const projectName = prompt('Please enter a name for your project');
    const newProject = <Project name={projectName} />;
    const userId = firebase.auth().currentUser.uid;
    const url = `https://projectmap-bf209.firebaseio.com/users/${userId}.json`;
    request.patch(url).send({ project: { projectName } }).catch((err) => {
      console.log(err);
    });
  }
  render() {
    return (
      <div>
        <h1>Welcome to your personal dashboard</h1>
        <button onClick={this.createNewProject}>+</button>
      </div>
    );
  }
}

export default Dashboard;
