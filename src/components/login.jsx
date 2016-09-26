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
  // handleSubmit() {
  //   const { username, password } = this.state;
  //   firebase.auth().signInWithEmailAndPassword(username, password).catch((err) => {
  //     const errCode = err.code;
  //     const errMessage = err.message;
  //   }).then(() => {
  //     this.props.router.push('/dashboard');
  //   });
  // }
  handleSubmit() {
    const { username, password } = this.state;
    firebase.auth()
            .signInWithEmailAndPassword(username, password)
            .catch((err) => {
              const errCode = err.code;
              const errMessage = err.message;
            })
            .then(() => {
              const userId = firebase.auth().currentUser.uid;
              this.props.router.push(`/${userId}`);
            });
  }
  render() {
    return (
      <div>
        <div id="login-form">
          <h1>LOGIN</h1>
          <div>
            <input name="username" className="loginInfoInput" onChange={this.handleChange} type="text" placeholder="username" autoFocus />
          </div>
          <div>
            <input name="password" className="loginInfoInput" onChange={this.handleChange} type="password" placeholder="password" />
          </div>
          <button className="btn" id="loginBtn" onClick={this.handleSubmit}>Login</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
