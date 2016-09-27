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
    };
    this.createNewComponent = this.createNewComponent.bind(this);
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
      if (componentData) {
        components = Object.keys(componentData).map((componentId) => {
          return componentData[componentId].name;
        });
      }
      this.setState({ components });
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
    let componentKey = 1;
    return this.state.components.map((component) => {
      componentKey += 1;
      return (
        <div key={componentKey} className="componentView">{component}</div>
      );
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
