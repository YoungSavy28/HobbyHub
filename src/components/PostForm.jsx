import { useState } from 'react';

const FLAG_OPTIONS = ['Question', 'Opinion', 'News', 'Highlight'];

export default function PostForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [flag, setFlag] = useState('');
  const [tags, setTags] = useState('');

  function handleImageUpload(e) {
    setImageFile(e.target.files[0]);
    setImageUrl(''); // Clear external URL if uploading
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    let imageSrc = imageUrl;
    if (imageFile) {
      imageSrc = URL.createObjectURL(imageFile);
    }
    onCreate({
      title,
      content,
      imageUrl: imageSrc,
      videoUrl,
      flag,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      createdAt: new Date().toISOString(),
      upvotes: 0,
      comments: [],
      id: Date.now() + Math.random()
    });
    setTitle('');
    setContent('');
    setImageUrl('');
    setImageFile(null);
    setVideoUrl('');
    setFlag('');
    setTags('');
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
        onChange={e => { setImageUrl(e.target.value); setImageFile(null); }}
        disabled={!!imageFile}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={!!imageUrl}
      />
      <input
        type="url"
        placeholder="Web Video URL (YouTube, Vimeo, etc.)"
        value={videoUrl}
        onChange={e => setVideoUrl(e.target.value)}
      />
      <select value={flag} onChange={e => setFlag(e.target.value)}>
        <option value="">Flag (optional)</option>
        {FLAG_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={e => setTags(e.target.value)}
      />
      <button type="submit">Create Post</button>
    </form>
  );
}
