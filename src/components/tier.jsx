import React, { Component } from 'react';
import firebase from '../../firebase.config.js';

// const propTypes = {
//   objectArray: React.PropTypes.array.isRequired,
// };

class Tier extends Component {
  constructor(tierNumber) {
    super();
    this.state = {
      tierNumber,
    };
  }
  componentDidMount() {
    console.log(this.state.tierNumber);
  }
  render() {
    return (
      <div className="tier">
        Tier
      </div>
    );
  }
}

// Tier.propTypes = propTypes;

export default Tier;
