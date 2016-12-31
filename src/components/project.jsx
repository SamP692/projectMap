import React, { Component } from 'react';
import { Link } from 'react-router';
import request from 'superagent';
import firebase from '../../firebase.config.js';

const propTypes = {
  params: React.PropTypes.object.isRequired,
};

class Project extends Component {
  constructor() {
    super();
    this.state = {
      tiers: {},
      objects: [],
    };
  }
  componentDidMount() {
    this.retrieveComponentData();
  }
  retrieveComponentData() {
    // const userId = firebase.auth().currentUser.uid;
    const userId = 'WDv8s5fAtIhGfHjyZ6dYMpr6uvo2';
    // const projectId = this.props.params.project;
    const projectId = '-K_CqRBCSaxvxiWacyfd';
    const url = `https://projectmap-bf209.firebaseio.com/users/${userId}/projects/${projectId}/components.json`;
    request.get(url).then((components) => {
      const componentData = components.body;
      this.updateTiers(componentData);
    });
  }
  updateTiers(componentData) {
    const tiers = {};
    Object.keys(componentData).forEach((id) => {
      const componentName = componentData[id].name;
      const tierNumber = componentData[id].tier;
      if (tiers[tierNumber]) {
        tiers[tierNumber].push(id);
      } else {
        tiers[tierNumber] = [id];
      }
    });
    this.setState({ tiers });
    console.log(this.state);
  }
  render() {
    return (
      <div id="componentHouse">
        <button>Nothing</button>
      </div>
    );
  }
}

Project.propTypes = propTypes;

export default Project;
