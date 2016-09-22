import React, { Component } from 'react';
import { Link } from 'react-router';
import firebase from '../../firebase.config.js';

const propTypes = {
  children: React.PropTypes.element.isRequired,
};

class Main extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
    };
  }
  componentWillMount() {
    setTimeout(() => {
      firebase.auth().onAuthStateChanged((user) => {
        this.setState({
          loggedIn: (user !== null),
        });
      });
    }, 200);
  }
  signOut() {
    firebase.auth().signOut().then(() => {
      console.log('user signed out');
    });
  }
  loggedInLinks() {
    if (!this.state.loggedIn) {
      return (
        <div>
          <Link to="/login" id="login">Login | </Link>
          <Link to="/register" id="register">Register</Link>
        </div>
      );
    } else {
      return (
        <div id="sign-out">
          <a href="#" onClick={this.signOut}>Sign Out</a>
        </div>
      );
    }
  }
  render() {
    return (
      <div>
        <header>
          <h1 id="navHeader">Project Map</h1>
          <div id="buttons">
            {this.loggedInLinks()}
          </div>
        </header>
        <div id="mainContet">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Main.propTypes = propTypes;

export default Main;
