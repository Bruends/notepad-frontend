import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LateralMenu from '../components/LateralMenu/';
import AllNotes from './notepad/Allnotes';
import Edit from './notepad/Edit';

class Notepad extends Component {
  render() {
    return (     
        <Router>
          <div>
            <LateralMenu />
            <Route exact to='/notepad' component={AllNotes} />
            <Route exact to='/notepad/edit' component={Edit} />
          </div>
        </Router>
      
    );
  }
}

export default Notepad;
