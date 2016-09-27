import React, { Component } from 'react';
// import { withRouter } from 'react-router';
import request from 'superagent';
import { Link } from 'react-router';
import firebase from '../../firebase.config.js';
// import Project from './project.jsx';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      projectNames: [],
      projectIds: [],
    };
    this.createProjectLinks = this.createProjectLinks.bind(this);
    this.getAllProjectsForUser = this.getAllProjectsForUser.bind(this);
    this.createNewProject = this.createNewProject.bind(this);
    this.handleNewProjectPost = this.handleNewProjectPost.bind(this);
    // this.deleteProject = this.deleteProject.bind(this);
    this.editProjectName = this.editProjectName.bind(this);
  }
  componentDidMount() {
    this.getAllProjectsForUser();
  }
  getAllProjectsForUser() {
    const userId = firebase.auth().currentUser.uid;
    const url = `https://projectmap-bf209.firebaseio.com/users/${userId}/projects.json`;
    request.get(url).then((data) => {
      const projectData = data.body;
      let projectNames = [];
      let projectIds = [];
      if (projectData) {
        projectNames = Object.keys(projectData).map((id) => {
          return projectData[id].name;
        });
        projectIds = Object.keys(projectData).map((id) => {
          return id;
        });
      }
      this.setState({ projectNames, projectIds });
    });
  }
  createNewProject() {
    const projectName = prompt('Please enter a name for your project');
    const userId = firebase.auth().currentUser.uid;
    const url = `https://projectmap-bf209.firebaseio.com/users/${userId}/projects.json`;
    request.post(url).send({ name: projectName }).catch((err) => {
      console.log(err);
    });
    this.getAllProjectsForUser();
  }
  createProjectLinks() {
    const userId = firebase.auth().currentUser.uid;
    return this.state.projectNames.map((project, idx) => {
      const projectUrl = `${userId}/${this.state.projectIds[idx]}`;
      return (
        <div>
          <Link key={idx} to={projectUrl}>
            <div className="projectLink">{project}
            </div>
          </Link>
          <button className="projectButton delete" id={this.state.projectIds[idx]} onClick={this.deleteProject}>X</button>
          <button className="projectbutton edit" id={this.state.projectIds[idx]} onClick={this.editProjectName}>Edit</button>
        </div>
      );
    });
  }
  // deleteProject() {
  //
  // }
  editProjectName(e) {
    const newProjectName = prompt('What would you like the new name to be?');
    const userId = firebase.auth().currentUser.uid;
    const projectId = e.target.id;
    const url = `https://projectmap-bf209.firebaseio.com/users/${userId}/projects/${projectId}.json`
    request.patch(url).set({ name: newProjectName });
    this.getAllProjectsForUser();
  }
  handleNewProjectPost() {
    this.createNewProject();
    this.getAllProjectsForUser();
  }
  render() {
    return (
      <div>
        <h1 id="dashboardHeader">My Projects</h1>
        <hr />
        <div id="newProjectButtonWrap"><button id="newProjectButton" onClick={this.handleNewProjectPost}>+</button> Create a New Project</div>
        <div id="projectContainer">{this.createProjectLinks()}</div>
      </div>
    );
  }
}

export default Dashboard;
