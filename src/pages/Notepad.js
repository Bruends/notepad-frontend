import React, { Component } from 'react';

import LateralMenu from '../components/LateralMenu/';
import AllNotes from '../containers/Allnotes';
import Modal from '../components/Modals/Modal';
import DeleteModal from '../components/Modals/DeleteModal';
import notepadApi from '../utils/notepadApi';
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

    this.handleRegister = this.handleRegister.bind(this);
    this.openRegisterModal = this.openRegisterModal.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.closeAllModals = this.closeAllModals.bind(this);
    this.reloadNotes = this.reloadNotes.bind(this);
  }

  // update notes after an api call
  reloadNotes(){
    this.setState({reloadNotes: true})
  }

  async handleRegister(noteData){
    try{
      const api = notepadApi(sessionStorage.getItem('token'));
      await api.saveNote(noteData);
      this.closeAllModals();
      this.reloadNotes();
    } catch (err){
      console.log(err);
    }
  }

  async handleEdit(noteData){
    try{
      const api = notepadApi(sessionStorage.getItem('token'));
      await api.editNote(noteData);
      this.closeAllModals();
      this.reloadNotes();
    } catch (err){
      console.log(err);
    }
  }

  async handleDelete(id){
    try{
      const api = notepadApi(sessionStorage.getItem('token'));
      await api.deleteNote(id);
      this.closeAllModals();
      this.reloadNotes();
    } catch (err){
      console.log(err);
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

        <Modal 
          isModalOpen={this.state.isRegisteModalOpen}
          handleSubmitToApi={this.handleRegister}
        />

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
