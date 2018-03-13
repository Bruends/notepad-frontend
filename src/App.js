import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './pages/Login';
import Notepad from './pages/Notepad';
import ProtectedRoute from './components/ProtectedRoute/';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      token: null,      
    }
    this.setToken = this.setToken.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  setToken(token){
    this.setState({ token });
  }

  destroyToken(){
    this.setState({ token: null });
  }

  isAuthenticated(){
    return false;
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path='/' render={(props) => (
            <Login {...props} setToken={this.setToken} />
          )} />
          
          <ProtectedRoute 
            exact path='/notepad'
            isAuthenticated={this.isAuthenticated}
            component={(props) => ( 
              <Notepad {...props} />
            )} />
        </div>
      </ Router>
    );
  }
}

export default App;
