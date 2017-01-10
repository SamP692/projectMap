import React, { Component } from 'react';
import { withRouter } from 'react-router';
import firebase from '../../firebase.config.js';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const stateObj = {};
    const stateKey = e.target.name;
    stateObj[stateKey] = e.target.value;
    this.setState(stateObj);
  }
  handleSubmit() {
    const { username, password } = this.state;
    firebase.auth()
            .signInWithEmailAndPassword(username, password)
            .catch((err) => {
              // const errCode = err.code;
              // const errMessage = err.message;
            })
            .then(() => {
              const userId = firebase.auth().currentUser.uid;
              this.props.router.push(`/${userId}`);
            });
  }
  render() {
    return (
      <div>
        <div className="acctInfo">
          <h1>LOGIN</h1>
          <input
            name="username"
            onChange={this.handleChange}
            type="text"
            placeholder="username"
            autoFocus
          />
          <input
            name="password"
            onChange={this.handleChange}
            type="password"
            placeholder="password"
          />
          <button onClick={this.handleSubmit}>Login</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
