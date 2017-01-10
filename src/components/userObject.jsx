import React, { Component } from 'react';

class UserComponent extends Component {
  render() {
    return (
      <div className="UserComponent">
        <h1>{this.props.objectDetails.name}</h1>
        <h1>{this.props.objectDetails.tier}</h1>
      </div>
    );
  }
}

export default UserComponent;
