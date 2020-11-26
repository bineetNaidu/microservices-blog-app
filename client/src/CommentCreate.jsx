import Axios from 'axios';
import React, { useState } from 'react';

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content) {
      await Axios.post(`http://posts.com/posts/${postId}/comments`, {
        content,
      });
      setContent('');
    } else {
      alert('Fill the fields');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">New Comment</label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
            placeholder="Comment"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create!
        </button>
      </form>
    </div>
  );
};

export default CommentCreate;
