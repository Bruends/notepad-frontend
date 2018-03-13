import React, { Component } from 'react';
import LoginForm from '../components/LoginForm/';
import { getToken, registerUser } from '../utils/authApi';

class Login extends Component {
  constructor (){
    super();
    this.state = {
      error: null,
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  async handleLogin(userData){   
     try {
      const res = await getToken(userData);    
      this.props.setToken(res.token);
      console.log(res.token);
     } catch (error){
      this.setState({ error: error.message })
     }
  }

  async handleRegister(userData){   
    try {
     const res = await registerUser(userData);  
     this.props.setToken(res.token);
     console.log(res.token);
    } catch (error){
       this.setState({ error: error.message })
    }
  }

  render() {
    return (
      <section>
        <LoginForm 
          error={this.state.error}
          handleLogin={this.handleLogin} 
          handleRegister={this.handleRegister} 
        />
      </section>
    );
  }
}

export default Login;
