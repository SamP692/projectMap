import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Main from '../components/main.jsx';
import Home from '../components/home.jsx';
import Register from '../components/register.jsx';
import Login from '../components/login.jsx';
import Dashboard from '../components/dashboard.jsx';
import requireAuth from '../utils/auth.js';
import Project from '../components/project.jsx';

const Routes = () => {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={Home} />
        <Route path="register" component={Register} />
        <Route path="login" component={Login} />
        <Route path=":user" component={Dashboard} onEnter={requireAuth} />
        <Route path=":user/:project" component={Project} />
      </Route>
    </Router>
  );
};

export default Routes;
