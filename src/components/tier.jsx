import React, { Component } from 'react';
import UserObject from './userObject.jsx';

class Tier extends Component {
  buildAllObjectComponents() {
    return this.props.objectsInTier.map((object) => {
      return (
        <UserObject key={object.name} objectDetails={object} />
      );
    });
  }
  render() {
    return (
      <div className="tier">
        {this.buildAllObjectComponents()}
      </div>
    );
  }
}

export default Tier;
