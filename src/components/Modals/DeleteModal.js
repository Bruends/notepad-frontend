import React from 'react';
import Modal from 'react-modal';
 
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
 
class NotesModal extends React.Component {
  constructor(props) {
    super(); 
    this.state = {
      isModalOpen: false,
      isEditing: false,  
      id: '',          
    };
    
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps){
    const {isModalOpen} = nextProps;
    this.setState({ 
      isModalOpen,     
      id: nextProps.id
    });
  }

  handleSubmit(e){
    e.preventDefault();
    const noteData = {
      id: this.state.id,      
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
        style={customStyles}
        contentLabel="Notes App"
      >
        <h3>Delete Note ?</h3>
        <form onSubmit={this.handleSubmit}>          
          <button style={{backgroundColor: '#EB5757'}} className="modalForm_button">Delete</button>
          <button style={{backgroundColor: '#333'}} className="modalForm_button" type="button" onClick={this.closeModal}>Cancel</button>
        </form>
      </Modal>
    );
  }
}

export default NotesModal;
