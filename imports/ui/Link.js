import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
// import { withRouter } from 'react-router';

export default class LinkPage extends React.Component {
  onLogout() {
    Accounts.logout();
  }
  render() {
    return (
      <div>
        <h1>This is your link page</h1>
        <button onClick={this.onLogout.bind(this)}>Log-out</button>
      </div>
    );
  }
}
