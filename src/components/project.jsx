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
      objects: {},
    };
  }
  componentDidMount() {
    this.updateComponentData();
  }
  updateComponentData() {
    const userId = 'WDv8s5fAtIhGfHjyZ6dYMpr6uvo2';
    const projectId = '-K_CqRBCSaxvxiWacyfd';
    const url = `https://projectmap-bf209.firebaseio.com/users/${userId}/projects/${projectId}/components.json`;
    request.get(url).then((components) => {
      const componentData = components.body;
      this.updateTierState(componentData);
      this.updateObjectState(componentData);
    });
  }
  updateObjectState(componentData) {
    const objects = componentData;
    this.setState({ objects });
    console.log(this.state);
  }
  updateTierState(componentData) {
    const tiers = {};
    Object.keys(componentData).forEach((id) => {
      const tierNumber = componentData[id].tier;
      if (tiers[tierNumber]) {
        tiers[tierNumber].push(id);
      } else {
        tiers[tierNumber] = [id];
      }
    });
    this.setState({ tiers });
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
