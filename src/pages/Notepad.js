import React, { Component } from 'react';

import LateralMenu from '../components/LateralMenu/';
import AllNotes from '../containers/Allnotes';
import AllModals from '../containers/AllModals';
import './notepad.css';

class Notepad extends Component {
  constructor(){
    super();
    this.state = {
      reloadNotes: false,
      isRegisteModalOpen: false,
      isEditModalOpen: false,
      isDeleteModalOpen: false,   
      selectedId: '',
      selectedText: '',
      selectedTitle: '',
    }
    
    this.reloadNotes = this.reloadNotes.bind(this);
       
    this.openRegisterModal = this.openRegisterModal.bind(this);
    this.openEditModal = this.openEditModal.bind(this);   
    this.openDeleteModal = this.openDeleteModal.bind(this);    
    this.closeAllModals = this.closeAllModals.bind(this);
  }

  // update notes after an api call
  reloadNotes(){
    this.setState({reloadNotes: true})
  } 

  openRegisterModal(){
    this.closeAllModals();
    this.setState({ isRegisteModalOpen: true });
  }

  openEditModal(noteData){
    this.closeAllModals();
    this.setState({
      selectedId: noteData.id,
      selectedTitle: noteData.title,
      selectedText: noteData.text,
      isEditModalOpen: true
    })    
  }

  openDeleteModal(noteData){
    this.closeAllModals();
    this.setState({
      selectedId: noteData.id,      
      isDeleteModalOpen: true
    })    
  }

  closeAllModals(){
    this.setState({
      isRegisteModalOpen: false,
      isEditModalOpen: false,
      isDeleteModalOpen: false, 
    })
  }

  render() {
    return (
      <div>
        <LateralMenu openModal={this.openRegisterModal} />
        
        <AllNotes 
          reloadNotes={this.state.reloadNotes}
          openEditModal={this.openEditModal} 
          openDeleteModal={this.openDeleteModal} 
        />

        <AllModals 
          isRegisteModalOpen={this.state.isRegisteModalOpen}
          isEditModalOpen={this.state.isEditModalOpen}
          isDeleteModalOpen={this.state.isDeleteModalOpen}
          closeAllModals={this.closeAllModals}
          reloadNotes={this.reloadNotes}
          selectedId={this.state.selectedId}
          selectedTitle={this.state.selectedTitle}
          selectedText={this.state.selectedText}          
        />

      </div>
    );
  }
}

export default Notepad;
