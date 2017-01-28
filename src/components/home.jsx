import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    return (
      <div >
        <h1>Welcome to React Mapper</h1>
        <section id="about">
          This is a resource to assist in mapping out complext React JS-based applications.
        </section>
        <section id="sample">
          Check out a sample map below and discover the architecture of this React
          JS-based application!
        </section>
      </div>
    );
  }
}
