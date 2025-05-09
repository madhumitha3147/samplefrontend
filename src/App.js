import React, { useEffect, useState } from 'react';
import NoteList from './NoteList';
import NoteForm from './NoteForm';
import API from './api';

function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  const fetchNotes = async () => {
    const res = await API.get('notes/');
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleEdit = (note) => {
    setEditingNote(note);
  };

  const handleDelete = async (id) => {
    await API.delete(`notes/${id}/`);
    fetchNotes();
  };

  const handleSave = () => {
    setEditingNote(null);
    fetchNotes();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📝 Notes with Tags</h1>
      <NoteForm note={editingNote} onSave={handleSave} />
      <NoteList notes={notes} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default App;
