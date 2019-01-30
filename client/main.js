import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import { Tracker } from 'meteor/tracker';
import createHistory from 'history/createBrowserHistory';

import SingUp from '../imports/ui/Singup';
import LinkPage from '../imports/ui/Link';
import NotFound from '../imports/ui/NotFound';
import Login from '../imports/ui/Login';

const history = createHistory();
const unauthenticatedPages = ['/', '/singup'];
const authenticatedPages = ['/links'];


const routes = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" render={() => {
        return Meteor.userId() ? <Redirect to="/links" /> : <Login />
      }}/>
      <Route exact path="/singup" render={() => {
        return Meteor.userId() ? <Redirect to="/links" /> : <SingUp />
      }}/>
      <Route exact path="/links" component={LinkPage}/>
      <Route component={NotFound}/>
    </Switch>
  </Router>
);

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const pathname = location.pathname;

  const IsUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (IsUnauthenticatedPage && isAuthenticated) {
    history.push('/links');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    history.push('/');
  }
  console.log('isAuthenticated', isAuthenticated);
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
