import React, { Component } from 'react';
import { BrowserRouter as Router, Route, BrowserRouter } from 'react-router-dom';

import LateralMenu from '../components/LateralMenu/';


class Notepad extends Component {
  render() {
    return (     
        <Router>
          <div>
            <LateralMenu />
            <Route exact to='/notepad' />
            <Route exact to='/notepad/edit' />
          </div>
        </Router>
      
    );
  }
}

export default Notepad;
