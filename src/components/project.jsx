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
      tiers: {},
      objects: {},
    };
  }
  componentDidMount() {
    this.updateComponentData();
  }
  updateComponentData() {
      // Temporary UID for development
    const userId = 'WDv8s5fAtIhGfHjyZ6dYMpr6uvo2';
      // Dynamic UID
    // const userId = firebase.auth().currentUser.uid;
      // Temporary project ID for development
    const projectId = '-K_CqRBCSaxvxiWacyfd';
      // Dynamic project ID
    // const projectId = this.props.params.project;
    const url = `https://projectmap-bf209.firebaseio.com/users/${userId}/projects/${projectId}/components.json`;
    request.get(url).then((components) => {
      const componentData = components.body;
      this.updateTierState(componentData);
      this.updateObjectState(componentData);
    });
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
  updateObjectState(componentData) {
    const objects = componentData;
    this.setState({ objects });
  }
  buildAllTiers() {
    const tiersState = this.state.tiers;
    const objectsState = this.state.objects;
    Object.keys(tiersState).forEach((tierId) => {
      const objectsInTier = [];
      Object.keys(objectsState).forEach((objectId) => {
        if (objectsState[objectId].tier === parseInt(tierId, 10)) {
          objectsInTier.push(objectsState[objectId]);
        }
      });
    });
  }
  // buildIndividualTiers(componentArray) {
  //
  // }
  render() {
    return (
      <div id="componentHouse">
        <button>Nothing</button>
        <div>{this.buildAllTiers()}</div>
      </div>
    );
  }
}

Project.propTypes = propTypes;

export default Project;
