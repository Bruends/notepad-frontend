import React from 'react';
import Modal from 'react-modal';
import './modal.css'; 

class NotesModal extends React.Component {
  constructor(props) {
    super();
 
    this.state = {
      isModalOpen: false,
      isEditing: false,  
      id: '',    
      title: '',
      text: '',
    };

    
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps){
    const {isModalOpen} = nextProps;
    this.setState({ 
      isModalOpen,
      title: nextProps.title,
      text: nextProps.text,
      id: nextProps.id
    });    
  }

  handleSubmit(e){
    e.preventDefault();
    const noteData = {
      _id: this.state.id,
      title: this.state.title,
      text: this.state.text
    }
    this.props.handleSubmitToApi(noteData);
    this.closeModal();
  }
 
  closeModal() {
    this.setState({ isModalOpen: false });
  }
 
  render() {
    return (
      <Modal        
        isOpen={this.state.isModalOpen}
        onRequestClose={this.closeModal}       
        contentLabel="Notes App"
      >

        <form className="modalForm" onSubmit={this.handleSubmit}>
          <label htmlFor="title" className="modalForm_label">Title: *</label>
          <input  
            id="title"
            className="modalForm_input"
            type="text" 
            name="title" 
            value={this.state.title}
            onChange={(e) => this.setState({ title: e.target.value })}
            required 
          />
          <label htmlFor="note" className="modalForm_label">Note: </label>
          <textarea rows="8" cols="50"
            id="note" 
            className="modalForm_textArea"
            type="textarea"
            value={this.state.text}
            onChange={(e) => this.setState({ text: e.target.value })}
          />
          <button 
            className="modalForm_button" 
            style={{backgroundColor: '#6FCF97'}}>
              Save
          </button>
          <button 
            className="modalForm_button"
            style={{backgroundColor: '#333'}} type="button"
            onClick={this.closeModal}>
              Cancel
          </button>
        </form>
      </Modal>
    );
  }
}

export default NotesModal;
