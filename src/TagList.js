import React, { useEffect, useState } from 'react';
import API from './api';

function TagList() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    API.get('tags/')
      .then(res => setTags(res.data))
      .catch(err => console.error('Error fetching tags:', err));
  }, []);

  return (
    <div>
      <h2>Available Tags</h2>
      <ul>
        {tags.map(tag => (
          <li key={tag.id}>{tag.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default TagList;
