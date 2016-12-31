import React, { Component } from 'react';
import request from 'superagent';
import firebase from '../../firebase.config.js';

const propTypes = {
  objectArray: React.PropTypes.array.isRequired,
};

class Tier extends Component {
  constructor(objectArray) {
    super();
    this.state = {
      arrayOfObjects: objectArray,
    };
  }
  render() {
    return (
      <div id="componentHouse">
        <button>Nothing</button>
        <div>{this.buildAllTiers()}</div>
      </div>
    );
  }
}

Tier.propTypes = propTypes;

export default Tier;
