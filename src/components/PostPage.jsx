import { useState } from 'react';
import CommentList from './CommentList';

const FLAG_OPTIONS = ['Question', 'Opinion', 'News', 'Highlight'];

export default function PostPage({ post, onUpvote, onComment, onEdit, onDelete, onBack }) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(post.title);
  const [editContent, setEditContent] = useState(post.content);
  const [editImageUrl, setEditImageUrl] = useState(post.imageUrl);
  const [editVideoUrl, setEditVideoUrl] = useState(post.videoUrl || '');
  const [editFlag, setEditFlag] = useState(post.flag || '');
  const [editTags, setEditTags] = useState(post.tags ? post.tags.join(', ') : '');

  function handleEdit(e) {
    e.preventDefault();
    onEdit(post.id, {
      ...post,
      title: editTitle,
      content: editContent,
      imageUrl: editImageUrl,
      videoUrl: editVideoUrl,
      flag: editFlag,
      tags: editTags.split(',').map(t => t.trim()).filter(Boolean)
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
          <input value={editVideoUrl} onChange={e => setEditVideoUrl(e.target.value)} />
          <select value={editFlag} onChange={e => setEditFlag(e.target.value)}>
            <option value="">Flag (optional)</option>
            {FLAG_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <input value={editTags} onChange={e => setEditTags(e.target.value)} placeholder="Tags (comma separated)" />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <h2>{post.title}</h2>
          <p className="post-meta">
            {new Date(post.createdAt).toLocaleString()} | Upvotes: {post.upvotes}
            {post.flag && <> | <span className="flag">{post.flag}</span></>}
          </p>
          {post.tags && post.tags.length > 0 && (
            <p className="tags">Tags: {post.tags.join(', ')}</p>
          )}
          {post.imageUrl && <img src={post.imageUrl} alt="Post" className="post-image" />}
          {post.videoUrl && post.videoUrl.includes('youtube') && (
            <iframe width="350" height="200" src={post.videoUrl.replace('watch?v=', 'embed/')} title="Video" frameBorder="0" allowFullScreen></iframe>
          )}
          {post.videoUrl && post.videoUrl.includes('vimeo') && (
            <iframe width="350" height="200" src={post.videoUrl.replace('vimeo.com/', 'player.vimeo.com/video/')} title="Video" frameBorder="0" allowFullScreen></iframe>
          )}
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
