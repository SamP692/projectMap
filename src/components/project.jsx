import React, { Component } from 'react';
import request from 'superagent';
import firebase from '../../firebase.config.js';

const propTypes = {
  params: React.PropTypes.object.isRequired,
};

class Project extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      components: [],
      componentIds: [],
    };
    this.createNewComponent = this.createNewComponent.bind(this);
    this.editComponentName = this.editComponentName.bind(this);
    this.deleteComponent = this.deleteComponent.bind(this);
  }
  componentDidMount() {
    this.getAllComponentsForProject();
  }
  getAllComponentsForProject() {
    const userId = firebase.auth().currentUser.uid;
    const projectId = this.props.params.project;
    const url = `https://projectmap-bf209.firebaseio.com/users/${userId}/projects/${projectId}/components.json`;
    request.get(url).then((data) => {
      const componentData = data.body;
      let components = [];
      let componentIds = [];
      if (componentData) {
        components = Object.keys(componentData).map((componentId) => {
          return componentData[componentId].name;
        });
        componentIds = Object.keys(componentData).map((componentId) => {
          return componentId;
        });
      }
      this.setState({ components, componentIds });
    });
  }
  createNewComponent() {
    const componentName = prompt('Please enter a name for your component');
    const userId = firebase.auth().currentUser.uid;
    const projectId = this.props.params.project;
    const url = `https://projectmap-bf209.firebaseio.com/users/${userId}/projects/${projectId}/components.json`;
    request.post(url).send({ name: componentName }).catch((err) => {
      console.log(err);
    });
    this.getAllComponentsForProject();
  }
  createComponentViews() {
    return this.state.components.map((component, idx) => {
      return (
        <div key={idx} className="componentView">
          {component}
          <button className="projectButton delete" id={this.state.componentIds[idx]} onClick={this.deleteComponent}>X</button>
          <button className="projectbutton edit" id={this.state.componentIds[idx]} onClick={this.editComponentName}>Edit</button>
        </div>
      );
    });
  }
  deleteComponent(e) {
    const userId = firebase.auth().currentUser.uid;
    const projectId = this.props.params.project;
    const componentId = e.target.id;
    const url = `https://projectmap-bf209.firebaseio.com/users/${userId}/projects/${projectId}/components/${componentId}.json`;
    request.del(url).catch((err) => {
      console.log(err);
    }).then(() => {
      this.getAllComponentsForProject();
    });
  }
  editComponentName(e) {
    const newProjectName = prompt('What would you like the new name to be?');
    const projectId = this.props.params.project;
    const userId = firebase.auth().currentUser.uid;
    const componentId = e.target.id;
    const url = `https://projectmap-bf209.firebaseio.com/users/${userId}/projects/${projectId}/components/${componentId}.json`;
    request.patch(url).send({ name: newProjectName }).catch((err) => {
      console.log(err);
    }).then(() => {
      this.getAllComponentsForProject();
    });
  }
  render() {
    return (
      <div id="componentHouse">
        <button id="createComponentButton" onClick={this.createNewComponent}>New Component</button>
        {this.createComponentViews()}
      </div>
    );
  }
}

Project.propTypes = propTypes;

export default Project;
