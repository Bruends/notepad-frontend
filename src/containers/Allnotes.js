import React, { Component } from 'react';
import NoteCard from '../components/NoteCard/';

import notepadApi from '../utils/notepadApi';
import AlertMessage from '../components/AlertMessage/';
import EmptyMessage from '../components/EmptyMessage/';

class AllNotes extends Component {
  constructor(){
    super();
    this.state = {
      notes: [],
      alert: {
        isVisible: false,
        message: '',
        type: '',
      }
    }

    this.loadNotes = this.loadNotes.bind(this);
    this.showMessage = this.showMessage.bind(this);
  }

  componentDidMount(){
    this.loadNotes();
    this.showMessage({message: 'Welcome !', type: 'info'});
  }

  componentWillReceiveProps(){
    this.loadNotes();
  }

  async loadNotes(){
    try {
      const api = notepadApi(sessionStorage.getItem('token'));
      const notes = await api.getAllNotes();
      this.setState({ notes });     
    } catch(err) {
      this.showMessage({message: err.message, type: 'error'});
    }
  }

  showMessage(alertConfig){
    alertConfig.isVisible = true;
    this.setState({ alert: alertConfig })
    // reset after show
    setTimeout(() => {
      this.setState({ alert: {
        isVisible: false,
        message: '',
        type: '',
      }})
    }, 2000);
  }

  render() {
    return (
      <div className="allNotes_container">
        {
          (this.state.notes.length === 0)
          
          ? <EmptyMessage />

          : this.state.notes.map(note => (
            <NoteCard 
              id={note._id}
              key={note._id}
              title={note.title}
              text={note.text}
              openEditModal={this.props.openEditModal}
              openDeleteModal={this.props.openDeleteModal}
           />
          ))
        }

        <AlertMessage
          isVisible={this.state.alert.isVisible}
          message={this.state.alert.message}
          type={this.state.alert.type} 
        />
      </div>
    );
  }
}

export default AllNotes;
