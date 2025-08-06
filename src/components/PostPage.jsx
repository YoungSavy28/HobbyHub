import { useState } from 'react';
import CommentList from './CommentList';

export default function PostPage({ post, onUpvote, onComment, onEdit, onDelete, onBack }) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(post.title);
  const [editContent, setEditContent] = useState(post.content);
  const [editImageUrl, setEditImageUrl] = useState(post.imageUrl);

  function handleEdit(e) {
    e.preventDefault();
    onEdit(post.id, {
      ...post,
      title: editTitle,
      content: editContent,
      imageUrl: editImageUrl
    });
    setEditing(false);
  }

  return (
    <div className="post-page">
      <button onClick={onBack}>Back to Feed</button>
      {editing ? (
        <form className="edit-form" onSubmit={handleEdit}>
          <input value={editTitle} onChange={e => setEditTitle(e.target.value)} required />
          <textarea value={editContent} onChange={e => setEditContent(e.target.value)} />
          <input value={editImageUrl} onChange={e => setEditImageUrl(e.target.value)} />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <h2>{post.title}</h2>
          <p className="post-meta">
            {new Date(post.createdAt).toLocaleString()} | Upvotes: {post.upvotes}
          </p>
          {post.imageUrl && <img src={post.imageUrl} alt="Post" className="post-image" />}
          <p>{post.content}</p>
          <button onClick={() => onUpvote(post.id)}>Upvote</button>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={() => onDelete(post.id)}>Delete</button>
        </>
      )}
      <CommentList post={post} onComment={onComment} />
    </div>
  );
}
