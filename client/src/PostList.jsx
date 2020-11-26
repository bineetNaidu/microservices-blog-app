import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    Axios.get('http://posts.com/posts')
      .then(({ data }) => setPosts(data))
      .catch((e) => alert(e.message));
  }, [setPosts]);

  return (
    <div className="container">
      <div className="d-flex flex-row flex-wrap justify-content-between">
        {posts &&
          Object.values(posts).map((p) => (
            <div className="card mb-5" style={{ width: '30%' }} key={p.id}>
              <div className="card-body">
                <h3>{p.title}</h3>
                <CommentList comments={p.comments} />
                <CommentCreate postId={p.id} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PostList;
