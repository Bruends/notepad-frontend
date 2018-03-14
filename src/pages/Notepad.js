import React, { Component } from 'react';

import LateralMenu from '../components/LateralMenu/';
import AllNotes from '../containers/Allnotes';

class Notepad extends Component {
  render() {
    return (     
      <div>
        <LateralMenu />
        <AllNotes />            
      </div>     
    );
  }
}

export default Notepad;
