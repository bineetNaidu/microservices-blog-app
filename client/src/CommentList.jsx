import React from 'react';

const CommentList = ({ comments }) => {
  const rendered = comments.map((c) => {
    let content;

    switch (c.status) {
      case 'approved':
        content = c.content;
        break;

      case 'pending':
        content = 'This comment is awaiting moderation';
        break;

      case 'rejected':
        content = 'This comment has been REJECTED';
        break;

      default:
        content = '';
        break;
    }

    return <li key={c.id}>{content}</li>;
  });
  return <ul>{rendered}</ul>;
};

export default CommentList;
