import React, { Component } from 'react';

import './loginForm.css';

class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      isRegistering: false,
      email: '',
      password: '',
      passwordConfirm: '',   
      error: null,         
    }    

    this.toggleMode = this.toggleMode.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  } 

  componentWillReceiveProps(nextProps){
    const { error } = nextProps;
    if(error !== null ){
      this.setState({ error });
    }
  }
  

  async handleSubmit(e){
    e.preventDefault();    

    // if passwords doenst match on register
    if(this.state.isRegistering && this.state.password != this.state.passwordConfirm){
      this.setState({ error: 'passwords dont match' })
      return;
    }   

    const {email, password} = this.state;
      const userData = {
        email,
        password
      }

    if(!this.state.isRegistering) {
      await this.props.handleLogin(userData);
      
    } else {      
      await this.props.handleRegister(userData); 
    }
  }

  toggleMode(e) {
    e.preventDefault();

    // invert isRegistering status
    if(this.state.isRegistering) {
      this.setState({ error: null, isRegistering: false });
    } else {      
      this.setState({ error: null, isRegistering: true });
    }
  }

  render() {
    return (
      <form className="loginForm" onSubmit={this.handleSubmit}>
        <h1 className="loginForm_h1">Auth Form</h1>
        <label className="loginForm_label" htmlFor="email">Email</label>
        <input
          className="loginForm_input"
          type="email"
          value={this.state.email}
          onChange={(e) => this.setState({ email: e.target.value })}
        />

        <label className="loginForm_label" htmlFor="email">password</label>
        <input
          className="loginForm_input"
          type="password"
          value={this.state.password}
          onChange={(e) => this.setState({ password: e.target.value })}
        />

        {
          // password confirm, only on register
          (this.state.isRegistering)
            ? <div>
                <label className="loginForm_label" htmlFor="email">Confirm password</label>
                <input
                  className="loginForm_input"
                  type="password"
                  value={this.state.passwordConfirm}
                  onChange={(e) => this.setState({ passwordConfirm: e.target.value })}
                />
              </div>
            : <div />
        }

        <button className="loginForm_mainButton">
          {
            (this.state.isRegistering)
              ? 'Register'
              : 'Login'
          }
        </button>

        <span 
          className={ this.state.error !== null
            ? "loginForm_error"
            : ''
          }>
          {
            (this.state.error !== null)
            ? this.state.error
            : ''
          }
        </span>

        <button className="loginForm_secundaryButton" type="button" onClick={this.toggleMode}>
          {
            (this.state.isRegistering)
              ? 'Or Login'
              : 'Or Register'
          }
        </button>

      </form>
    );
  }
}

export default LoginForm;
