import React, { Component } from 'react';

const propTypes = {
  name: React.PropTypes.string.isRequired,
};

class Project extends Component {
  constructor(props) {
    super(props);
    this.name = props.name;
  }
  render() {
    return (
      <div className="projectLink">Test Project</div>
    );
  }
}

Project.propTypes = propTypes;

export default Project;
