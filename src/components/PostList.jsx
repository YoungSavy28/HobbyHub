import PostPreview from './PostPreview';

const FLAG_OPTIONS = ['All', 'Question', 'Opinion', 'News', 'Highlight'];

export default function PostList({ posts, onSelect, sortBy, setSortBy, search, setSearch, showContent, setShowContent, flagFilter, setFlagFilter }) {
  const filteredPosts = posts
    .filter(post => post.title.toLowerCase().includes(search.toLowerCase()))
    .filter(post => flagFilter === 'All' || post.flag === flagFilter);

  const sortedPosts = [...filteredPosts]
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
        <select value={flagFilter} onChange={e => setFlagFilter(e.target.value)}>
          {FLAG_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <label style={{marginLeft: '1rem'}}>
          <input type="checkbox" checked={showContent} onChange={e => setShowContent(e.target.checked)} /> Show content/images
        </label>
      </div>
      {sortedPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        sortedPosts.map(post => (
          <PostPreview key={post.id} post={post} onClick={() => onSelect(post.id)} showContent={showContent} />
        ))
      )}
    </div>
  );
}
