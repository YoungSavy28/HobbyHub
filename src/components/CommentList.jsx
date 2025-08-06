import { useState } from 'react';

export default function CommentList({ post, onComment }) {
  const [comment, setComment] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!comment.trim()) return;
    onComment(post.id, comment);
    setComment('');
  }

  return (
    <div className="comment-list">
      <h3>Comments</h3>
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <button type="submit">Comment</button>
      </form>
      <ul>
        {post.comments.length === 0 ? (
          <li>No comments yet.</li>
        ) : (
          post.comments.map((c, i) => <li key={i}>{c}</li>)
        )}
      </ul>
    </div>
  );
}
