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
      masterComponent: [],
      levelTwoComponents: [],
      levelThreeComponents: [],
      levelFourComponents: [],
      levelFiveComponents: [],
      levelSixComponents: [],
      levelSevenComponents: [],
    };
  }
  componentDidMount() {
    this.updateProjectDetails();
  }
  updateProjectDetails() {
    const userId = firebase.auth().currentUser.uid;
    const projectId = this.props.params.project;
    const url = `https://projectmap-bf209.firebaseio.com/users/${userId}/projects/${projectId}.json`;
    request.get(url).then((data) => {
      const projectInfo = data.body;
      this.setState({ name: projectInfo.name });
    });
  }
  addMasterComponent() {
    
  }
  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <div id="componentHouse"></div>
      </div>
    );
  }
}

Project.propTypes = propTypes;

export default Project;
