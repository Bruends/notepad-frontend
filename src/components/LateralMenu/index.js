import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NotesIcon from 'react-icons/lib/md/developer-board';
import EditIcon from 'react-icons/lib/md/add-circle-outline';
import LogoutIcon from 'react-icons/lib/md/power-settings-new';

import './lateralMenu.css';

class LateralMenu extends Component {
  render() {
    return (
      <nav className="lateralMenu_container">
        <ul className="lateralMenu">
          <li className="lateralMenu_item">
            <Link to='/notepad/'>
              <NotesIcon />              
            </Link>
          </li>
          <li className="lateralMenu_item">
            <Link to='/notepad/edit'>
              <EditIcon />
            </Link>
          </li>
          <li className="lateralMenu_item">
            <Link to='/'>
              <LogoutIcon />
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default LateralMenu;
