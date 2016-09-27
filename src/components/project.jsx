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
  }
  componentDidMount() {
    console.log(this.props.params.project);
  }
  getAllComponentsForProject() {
    const userId = firebase.auth().currentUser.uid;
    const projectId = this.props.params.project;
    const url = `https://projectmap-bf209.firebaseio.com/users/${userId}/projects/${projectId}.json`;
    request.get(url).then((data) => {
      const componentData = data.body;
      let components = [];
      if (componentData) {
        components = Object.keys(componentData).map((id, idx) => { // NEED TO FINISH
          return componentData[idx].name; // NEED TO FINISH
        });
      }
      this.setState({ components });
    });
  }
  render() {
    return (
      <h1>Stuff</h1>
    );
  }
}

Project.propTypes = propTypes;

export default Project;
