import React, { useState } from 'react';
import Axios from 'axios';

const PostCreate = () => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title) {
      await Axios.post('http://posts.com/posts/create', { title });
      setTitle('');
    } else {
      alert('Fill the fields');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            placeholder="Title"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create!
        </button>
      </form>
    </div>
  );
};

export default PostCreate;
