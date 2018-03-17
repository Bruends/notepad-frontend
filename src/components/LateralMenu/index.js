import React, { Component } from 'react';
import NotesIcon from 'react-icons/lib/md/developer-board';
import AddIcon from 'react-icons/lib/md/add-circle-outline';
import LogoutIcon from 'react-icons/lib/md/power-settings-new';

import './lateralMenu.css';

class LateralMenu extends Component {
  constructor(){
    super();  
    this.openAddModal = this.openAddModal.bind(this);
  }

  logout(e){
    e.preventDefault();
    sessionStorage.removeItem('token');
    window.location.reload();
  }

  openAddModal(e) {
    e.preventDefault();
    this.props.openModal();
  }

  render() {
    return (
      <nav className="lateralMenu_container">
        <ul className="lateralMenu">
          <li>
            <span className="lateralMenu_logo">
              <NotesIcon />              
            </span>
          </li>
          <li >
          <span className="lateralMenu_item" role="button" title="add Note"      
            onClick={this.openAddModal}>
              <AddIcon />
          </span>
          </li>
          <li >
            <span className="lateralMenu_item" role="button" title="logout" 
              onClick={this.logout}>
                <LogoutIcon />
            </span>
          </li>
        </ul>
      </nav>
    );
  }
}

export default LateralMenu;
