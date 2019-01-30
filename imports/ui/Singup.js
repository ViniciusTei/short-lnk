import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

export default class SingUp extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        error: ''
      };
  }

  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    Accounts.createUser({email, password}, (err) => {
      console.log('Singup callback', err);
    });

    // this.setState({
    //   error: 'Something went wrong.'
    // });
  }

  render() {
    return(
      <div>
        <h1>Join Short Lnk</h1>

        {this.state.error ? <p>{this.state.error}</p> : undefined}

        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="email" ref="email" name="email" placeholder="email@email.com"/>
          <input type="password" ref="password" name="password" placeholder="password"/>
          <button>Create Account</button>
        </form>

        <Link to="/">Alredy have an account?</Link>
      </div>
    );
  }
}
