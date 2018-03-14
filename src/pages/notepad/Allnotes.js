import React, { Component } from 'react';
import NoteCard from '../../components/NoteCard/';

import notepadApi from '../../utils/notepadApi';

const style = {
  marginLeft: '90px'
}

class AllNotes extends Component {
  constructor(){
    super();
    this.state = {
      notes: []
    }
  }

  async componentDidMount(){
    const api = notepadApi(sessionStorage.getItem('token'));
    const notes = await api.getAllNotes();
    this.setState({ notes });
  }

  render() {
    return (
      <div style={style}>
        {
          this.state.notes.map(note => (
            <NoteCard 
              key={note._id}
              title={note.title}
              text={note.text} 
           />
          ))
        }
      </div>
    );
  }
}

export default AllNotes;
