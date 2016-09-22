import React, { Component } from 'react';
import { withRouter } from 'react-router';
import firebase from '../../firebase.config.js';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
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
    const { username, password, name } = this.state;
    firebase.auth().createUserWithEmailAndPassword(username, password).catch((err) => {
      console.log(err);
    }).then((user) => {
      firebase.database().ref('users').child(user.uid).set({ name, email: username });
    }).then(() => {
      this.props.router.push('/dashboard');
    });
  }
  render() {
    return (
      <div>
        <div id="register-form">
          <div>
            <input name="name" onChange={this.handleChange} type="text" placeholder="name" autoFocus />
          </div>
          <div>
            <input name="username" onChange={this.handleChange} type="text" placeholder="username" />
          </div>
          <div>
            <input name="password" onChange={this.handleChange} type="password" placeholder="password" />
          </div>
          <button onClick={this.handleSubmit} className="btn">Register</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
