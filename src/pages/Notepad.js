import React, { Component } from 'react';

import LateralMenu from '../components/LateralMenu/';
import AllNotes from '../containers/Allnotes';
import RegisterModal from '../components/Modals/Modal';
import notepadApi from '../utils/notepadApi';


class Notepad extends Component {
  constructor(){
    super();
    this.state = {
      isRegisteModalOpen: false,
      isDeleteModalOpen: false,      
    }

    this.handleRegister = this.handleRegister.bind(this);
    this.openRegisterModal = this.openRegisterModal.bind(this);
  }

  async handleRegister(userData){
    try{
      const api = notepadApi(sessionStorage.getItem('token'));
      await api.saveNote(userData);
    } catch (err){
      console.log(err);
    }
  }

  openRegisterModal(){
    this.setState({ isRegisteModalOpen: true });
  }

  render() {
    return (
      <div>
        <LateralMenu openModal={this.openRegisterModal} />
        <AllNotes />
        <RegisterModal 
          isModalOpen={this.state.isRegisteModalOpen}
          handleSubmitToApi={this.handleRegister}
        />
      </div>
    );
  }
}

export default Notepad;
