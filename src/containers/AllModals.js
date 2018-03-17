import React, { Component } from 'react';

import AlertMessage from '../components/AlertMessage';
import Modal from '../components/Modals/Modal';
import DeleteModal from '../components/Modals/DeleteModal';
import notepadApi from '../utils/notepadApi';

class AllModals extends Component {
  constructor(){
    super();
    this.state = {      
      showMessage: false,
      message: { type: '', text: '' },
    }
    
    
    this.showMessage = this.showMessage.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleEdit = this.handleEdit.bind(this);    
    this.handleDelete = this.handleDelete.bind(this);    
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
      this.props.closeAllModals();
      this.props.reloadNotes();
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
      this.props.closeAllModals();
      this.props.reloadNotes();
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
      this.props.closeAllModals();
      this.props.reloadNotes();
      this.showMessage({text: 'Deleted Successfully!', type: 'success'});
    } catch (err){
      this.showMessage({text: 'Error on delete!', type: 'error'});
    }    
  }

  render() {
    return (
      <div>
        <AlertMessage
          isVisible={this.state.showMessage}
          message={this.state.message.text}
          type={this.state.message.type}
        />

        {/* register modal */}
        <Modal 
          isModalOpen={this.props.isRegisteModalOpen}
          handleSubmitToApi={this.handleRegister}
        />

        {/* edit modal */}
        <Modal 
          isModalOpen={this.props.isEditModalOpen}
          handleSubmitToApi={this.handleEdit}
          id={this.props.selectedId}
          title={this.props.selectedTitle}
          text={this.props.selectedText}
          isEditing
        />

        <DeleteModal 
          isModalOpen={this.props.isDeleteModalOpen}
          handleSubmitToApi={this.handleDelete}
          id={this.props.selectedId}
        />  

      </div>

      
    );
  }
}

export default AllModals;
