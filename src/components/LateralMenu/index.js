import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NotesIcon from 'react-icons/lib/md/developer-board';
import AddIcon from 'react-icons/lib/md/add-circle-outline';
import LogoutIcon from 'react-icons/lib/md/power-settings-new';

import './lateralMenu.css';

class LateralMenu extends Component {
  logout(e){
    e.preventDefault();
    sessionStorage.removeItem('token');
    window.location.reload();
  }

  render() {
    return (
      <nav className="lateralMenu_container">
        <ul className="lateralMenu">
          <li className="lateralMenu_item">
            <a href="" title="All Notes">
              <NotesIcon />              
            </ a>
          </li>
          <li className="lateralMenu_item">
          <a href="" Title="add Note">
              <AddIcon />
            </a>
          </li>
          <li className="lateralMenu_item">
            <a href="" title="logout" onClick={this.logout}>
              <LogoutIcon />
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default LateralMenu;
