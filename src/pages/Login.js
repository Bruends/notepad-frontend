import React, { Component } from 'react';
import LoginForm from '../components/LoginForm/';
import RegisterForm from '../components/RegisterForm/';

class Login extends Component {
  constructor (){
    super();
    this.state = {
      isRegistering: false,
    }
  }

  render() {
    return (
      <div>
        {
          (this.state.isRegistering) 
          ? <LoginForm />
          : <RegisterForm />
        }
      </div>
    );
  }
}

export default Login;
