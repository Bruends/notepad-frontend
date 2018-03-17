import React, { Component } from 'react';

import LateralMenu from '../components/LateralMenu/';
import AllNotes from '../containers/Allnotes';
import AlertMessage from '../components/AlertMessage';
import Modal from '../components/Modals/Modal';
import DeleteModal from '../components/Modals/DeleteModal';
import notepadApi from '../utils/notepadApi';
import './notepad.css';

class Notepad extends Component {
  constructor(){
    super();
    this.state = {
      reloadNotes: false,
      showMessage: false,
      message: { type: '', text: '' },
      isRegisteModalOpen: false,
      isEditModalOpen: false,
      isDeleteModalOpen: false,   
      selectedId: '',
      selectedText: '',
      selectedTitle: '',
    }
    
    this.reloadNotes = this.reloadNotes.bind(this);
    this.showMessage = this.showMessage.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.openRegisterModal = this.openRegisterModal.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.closeAllModals = this.closeAllModals.bind(this);
  }

  // update notes after an api call
  reloadNotes(){
    this.setState({reloadNotes: true})
  }

  showMessage(message){
    this.setState({showMessage: true, message})
    // reset after show
    setTimeout(() => {
      this.setState({showMessage: false, message: ''})
    }, 2000);
  }

  async handleRegister(noteData){
    try{
      const api = notepadApi(sessionStorage.getItem('token'));
      await api.saveNote(noteData);
      this.closeAllModals();
      this.reloadNotes();
      this.showMessage({text: 'Saved Successfully!', type: 'success'});
    } catch (err){
      console.log(err);
      this.showMessage({
        text: 'Error on Save! ' + err.message, 
        type: 'error'});
    }
  }

  async handleEdit(noteData){
    try{
      const api = notepadApi(sessionStorage.getItem('token'));
      await api.editNote(noteData);
      this.closeAllModals();
      this.reloadNotes();
      this.showMessage({text: 'Edited Successfully!', type: 'success'});
    } catch (err){
      console.log(err);
      this.showMessage({text: 'Error on Edit!', type: 'error'});
    }
  }

  async handleDelete(id){
    try{
      const api = notepadApi(sessionStorage.getItem('token'));
      await api.deleteNote(id);
      this.closeAllModals();
      this.reloadNotes();
      this.showMessage({text: 'Deleted Successfully!', type: 'success'});
    } catch (err){
      this.showMessage({text: 'Error on delete!', type: 'error'});
    }
    console.log(id);
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

        <AlertMessage
          isVisible={this.state.showMessage}
          message={this.state.message.text}
          type={this.state.message.type}
        />

        {/* register modal */}
        <Modal 
          isModalOpen={this.state.isRegisteModalOpen}
          handleSubmitToApi={this.handleRegister}
        />

        {/* edit modal */}
        <Modal 
          isModalOpen={this.state.isEditModalOpen}
          handleSubmitToApi={this.handleEdit}
          id={this.state.selectedId}
          title={this.state.selectedTitle}
          text={this.state.selectedText}
          isEditing
        />

        <DeleteModal 
          isModalOpen={this.state.isDeleteModalOpen}
          handleSubmitToApi={this.handleDelete}
          id={this.state.selectedId}
        />  

      </div>
    );
  }
}

export default Notepad;
