import React, { useEffect, useState } from 'react';
import API from './api';
import './NoteForm.css';

function NoteForm({ note, onSave }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [tagIds, setTagIds] = useState([]);

  useEffect(() => {
    // Fetch available tags from the backend
    API.get('tags/')
      .then(res => setTags(res.data))
      .catch(err => console.error("Error loading tags:", err));

    // If editing an existing note, populate form fields
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setTagIds(note.tags.map(tag => tag.id)); // Extract tag IDs from tag objects
    } else {
      setTitle('');
      setContent('');
      setTagIds([]);
    }
  }, [note]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      content,
      tag_ids: tagIds
    };

    try {
      if (note) {
        await API.put(`notes/${note.id}/`, payload);
      } else {
        await API.post('notes/', payload);
      }
      onSave(); // Trigger refresh and clear form
    } catch (err) {
      console.error("Error saving note:", err);
    }
  };

  const toggleTag = (id) => {
    setTagIds(prev =>
      prev.includes(id)
        ? prev.filter(tagId => tagId !== id)
        : [...prev, id]
    );
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <h2>{note ? 'Edit Note' : 'Add Note'}</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
        required
        rows={5}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />

      <div style={{ marginBottom: '10px' }}>
        <strong>Tags:</strong><br />
        {tags.map(tag => (
          <label key={tag.id} style={{ marginRight: 15 }}>
            <input
              type="checkbox"
              checked={tagIds.includes(tag.id)}
              onChange={() => toggleTag(tag.id)}
            /> {tag.name}
          </label>
        ))}
      </div>

      <button type="submit" style={{ padding: '8px 16px' }}>
        {note ? 'Update Note' : 'Add Note'}
      </button>
    </form>
  );
}

export default NoteForm;
