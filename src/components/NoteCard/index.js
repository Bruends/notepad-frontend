import React from 'react';
import './NoteCard.css';
import PencilIcon from 'react-icons/lib/fa/pencil';
import TrashIcon from 'react-icons/lib/fa/trash';

const handleEditClick = (props) => {
  const note = {
    id: props.id,
    title: props.title,
    text: props.text
  }

  props.openEditModal(note);
}

const handleDeleteClick = (props) => {
  const {id} = props;
  props.openDeleteModal({ id });
}

const NoteCard = (props) => (
  <article className="noteCard_container">
    <h3 className="noteCard_title">{props.title}</h3>
    <p className="noteCard_text">
      {props.text}
    </p>
    <button className="noteCard_button" onClick={() => handleEditClick(props)}>
      <PencilIcon />
    </button>
    <button className="noteCard_button" onClick={() => handleDeleteClick(props)}>
      <TrashIcon />
    </button>
  </article>
);

export default NoteCard;
