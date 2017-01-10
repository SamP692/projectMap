import React, { Component } from 'react';
import request from 'superagent';
import { Link } from 'react-router';
import firebase from '../../firebase.config.js';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      projects: {},
    };
    this.createProjectLinks = this.createProjectLinks.bind(this);
    this.getAllProjectsForUser = this.getAllProjectsForUser.bind(this);
    this.createNewProject = this.createNewProject.bind(this);
    this.handleNewProjectPost = this.handleNewProjectPost.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
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
      const projects = {};
      Object.keys(projectData).forEach((project) => {
        projects[project] = {
          name: projectData[project].name,
        };
      });
      this.setState({ projects });
    });
  }
  createNewProject() {
    const projectName = prompt('Please enter a name for your project');
    const userId = firebase.auth().currentUser.uid;
    const url = `https://projectmap-bf209.firebaseio.com/users/${userId}/projects.json`;
    request.post(url).send({ name: projectName }).catch();
    this.getAllProjectsForUser();
  }
  createProjectLinks() {
    const userProjects = this.state.projects;
    return Object.keys(userProjects).map(project =>
    (
      <div className="projectLink" key={project}>
        <h4>{userProjects[project].name}</h4>
        <button id={project} onClick={this.deleteProject}>X</button>
        <button id={project} onClick={this.editProjectName}>Edit</button>
      </div>
      )
    );
  }
  deleteProject(e) {
    const userId = firebase.auth().currentUser.uid;
    const projectId = e.target.id;
    const url = `https://projectmap-bf209.firebaseio.com/users/${userId}/projects/${projectId}.json`;
    request.del(url).catch().then(() => {
      this.getAllProjectsForUser();
    });
  }
  editProjectName(e) {
    const newProjectName = prompt('What would you like the new name to be?');
    const userId = firebase.auth().currentUser.uid;
    const projectId = e.target.id;
    const url = `https://projectmap-bf209.firebaseio.com/users/${userId}/projects/${projectId}.json`;
    request.patch(url).send({ name: newProjectName }).catch().then(() => {
      this.getAllProjectsForUser();
    });
  }
  handleNewProjectPost() {
    this.createNewProject();
    this.getAllProjectsForUser();
  }
  render() {
    return (
      <div id="dashboard">
        <h1>My Projects</h1>
        <hr />
        <div id="newProjectButtonWrap">
          <button id="newProjectButton" onClick={this.handleNewProjectPost}>+</button>
          Create a New Project
        </div>
        <div id="projectContainer">{this.createProjectLinks()}</div>
      </div>
    );
  }
}

export default Dashboard;
