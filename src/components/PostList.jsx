import PostPreview from './PostPreview';

export default function PostList({ posts, onSelect, sortBy, setSortBy, search, setSearch }) {
  const sortedPosts = [...posts]
    .filter(post => post.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'upvotes') return b.upvotes - a.upvotes;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <div className="post-list">
      <div className="post-list-controls">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="createdAt">Newest</option>
          <option value="upvotes">Most Upvoted</option>
        </select>
      </div>
      {sortedPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        sortedPosts.map(post => (
          <PostPreview key={post.id} post={post} onClick={() => onSelect(post.id)} />
        ))
      )}
    </div>
  );
}
