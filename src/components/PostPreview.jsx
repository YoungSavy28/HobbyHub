export default function PostPreview({ post, onClick }) {
  return (
    <div className="post-preview" onClick={onClick}>
      <h3>{post.title}</h3>
      <p className="post-meta">
        {new Date(post.createdAt).toLocaleString()} | Upvotes: {post.upvotes}
      </p>
    </div>
  );
}
