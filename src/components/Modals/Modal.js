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
  constructor() {
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
    this.setState({ isModalOpen });
  }

  handleSubmit(e){
    e.preventDefault();
    const userData = {
      id: this.state.id,
      title: this.state.title,
      text: this.state.text
    }
    this.props.handleSubmitToApi(userData);
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

        <form onSubmit={this.handleSubmit}>
          <input value={this.props.id} type="hidden" name="id"/>
          <input  
            type="text" 
            name="title" 
            value={this.state.title}
            onChange={(e) => this.setState({ title: e.target.value })}
            required 
          />
          <input 
            type="textarea"
            value={this.state.text}
            onChange={(e) => this.setState({ text: e.target.value })}
          />
          <button>Save</button>
          <button type="button" onClick={this.closeModal}>Cancel</button>
        </form>
      </Modal>
    );
  }
}

export default NotesModal;
