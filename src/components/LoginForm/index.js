import React, { Component } from 'react';

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
    console.log('hai');

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
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={this.state.email}
          onChange={(e) => this.setState({ email: e.target.value })}
        />

        <label htmlFor="email">password</label>
        <input
          type="password"
          value={this.state.password}
          onChange={(e) => this.setState({ password: e.target.value })}
        />

        {
          // password confirm, only on register
          (this.state.isRegistering)
            ? <div>
                <label htmlFor="email">Confirm password</label>
                <input
                  type="password"
                  value={this.state.passwordConfirm}
                  onChange={(e) => this.setState({ passwordConfirm: e.target.value })}
                />
              </div>
            : <div />
        }

        <button>
          {
            (this.state.isRegistering)
              ? 'Register'
              : 'Login'
          }
        </button>

        <button type="button" onClick={this.toggleMode}>
          {
            (this.state.isRegistering)
              ? 'Login'
              : 'Register'
          }
        </button>

        <span>
          {
            (this.state.error !== null)
            ? this.state.error
            : ''
          }
        </span>
      </form>
    );
  }
}

export default LoginForm;
