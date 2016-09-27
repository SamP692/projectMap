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
      components: '',
    };
  }
  componentDidMount() {
    this.updateProjectName();
  }
  // snapshotTest() {
  //   const userId = firebase.auth().currentUser.uid;
  //   const data = firebase.database().ref().child('users')
  //                                         .child(userId)
  //                                         .child('projects');
  //   data.on('value', (snapshot) => {
  //     console.log(snapshot.val());
  //   });
  // }
  updateProjectName() {
    const userId = firebase.auth().currentUser.uid;
    const projectId = this.props.params.project;
    const url = `https://projectmap-bf209.firebaseio.com/users/${userId}/projects/${projectId}.json`;
    request.get(url).then((data) => {
      const projectInfo = data.body;
      this.setState({ name: projectInfo.name });
    });
  }
  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <div id="componentHouse"></div>
        <button id="newParentComponent" onClick={this.addMasterComponent}>Start Project</button>
      </div>
    );
  }
}

Project.propTypes = propTypes;

export default Project;
