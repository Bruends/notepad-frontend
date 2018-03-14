import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Login from './pages/Login';
import Notepad from './pages/Notepad';
import ProtectedRoute from './components/ProtectedRoute/';

class App extends Component {
  constructor(props){
    super(props);    
    this.state = {
      redirectToApp: false,
    }
    this.setTokenAndLogin = this.setTokenAndLogin.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  setTokenAndLogin(token){
    sessionStorage.setItem('token', 'Bearer ' + token);
    this.setState({ redirectToApp: true });
  }

  destroyToken(){
    sessionStorage.removeItem('token');
  }
   
  isAuthenticated(){  
    if(sessionStorage.getItem('token') == null){
      return false;
    }
    return true;
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path='/' render={(props) => (
            <Login {...props} setTokenAndLogin={this.setTokenAndLogin} />
          )} />
          
          <ProtectedRoute 
            path='/notepad'
            isAuthenticated={this.isAuthenticated}
            component={(props) => ( 
              <Notepad {...props} />
            )} />
            
            {
              // redirect to app when logged in
              (this.state.redirectToApp)
              ? <Redirect to='/notepad' />
              : ''
            }
        </div>
      </ Router>
    );
  }
}

export default App;
