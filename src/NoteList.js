import React from 'react';
import './NoteList.css';

function NoteList({ notes, onEdit, onDelete }) {
  return (
    <div>
      <h2>All Notes</h2>
      {notes.map(note => (
        <div key={note.id} style={{ border: '1px solid #ccc', marginBottom: 10, padding: 10 }}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <p><strong>Tags:</strong> {note.tags.map(tag => tag.name).join(', ')}</p>
          <button onClick={() => onEdit(note)}>Edit</button>
          <button onClick={() => onDelete(note.id)} style={{ marginLeft: 5 }}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default NoteList;
