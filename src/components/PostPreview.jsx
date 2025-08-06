export default function PostPreview({ post, onClick, showContent }) {
  return (
    <div className="post-preview" onClick={onClick}>
      <h3>{post.title}</h3>
      <p className="post-meta">
        {new Date(post.createdAt).toLocaleString()} | Upvotes: {post.upvotes}
        {post.flag && <> | <span className="flag">{post.flag}</span></>}
      </p>
      {post.tags && post.tags.length > 0 && (
        <p className="tags">Tags: {post.tags.join(', ')}</p>
      )}
      {showContent && (
        <>
          {post.imageUrl && <img src={post.imageUrl} alt="Post" className="post-image" style={{maxWidth:'200px'}} />}
          {post.videoUrl && post.videoUrl.includes('youtube') && (
            <iframe width="250" height="140" src={post.videoUrl.replace('watch?v=', 'embed/')} title="Video" frameBorder="0" allowFullScreen></iframe>
          )}
          {post.videoUrl && post.videoUrl.includes('vimeo') && (
            <iframe width="250" height="140" src={post.videoUrl.replace('vimeo.com/', 'player.vimeo.com/video/')} title="Video" frameBorder="0" allowFullScreen></iframe>
          )}
          <p>{post.content}</p>
        </>
      )}
    </div>
  );
}
