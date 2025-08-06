import { useState } from 'react';

export default function PostForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate({
      title,
      content,
      imageUrl,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      comments: [],
      id: Date.now() + Math.random()
    });
    setTitle('');
    setContent('');
    setImageUrl('');
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h2>Create a New Post</h2>
      <input
        type="text"
        placeholder="Post Title (required)"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content (optional)"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <input
        type="url"
        placeholder="Image URL (optional)"
        value={imageUrl}
        onChange={e => setImageUrl(e.target.value)}
      />
      <button type="submit">Create Post</button>
    </form>
  );
}
