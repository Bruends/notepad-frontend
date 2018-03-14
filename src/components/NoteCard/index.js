import React from 'react';
import './NoteCard.css';
import PencilIcon from 'react-icons/lib/fa/pencil';
import TrashIcon from 'react-icons/lib/fa/trash';


const NoteCard = (props) => (
  <article className="noteCard_container">
    <h3 className="noteCard_title">{props.title}</h3>
    <p className="noteCard_text">
      {props.text}
    </p>
    <button className="noteCard_button" onClick={props.edit}>
      <PencilIcon />
    </button>
    <button className="noteCard_button" onClick={props.delete}>
      <TrashIcon />
    </button>
  </article>
);

export default NoteCard;
