import { useState, useEffect } from 'react';
import './App.css';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import PostPage from './components/PostPage';
import ThemeSelector from './components/ThemeSelector';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [sortBy, setSortBy] = useState('createdAt');
  const [search, setSearch] = useState('');
  const [showContent, setShowContent] = useState(true);
  const [flagFilter, setFlagFilter] = useState('All');
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(false);

  // Simulate loading animation for data fetch
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, [posts.length]);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  function handleCreate(post) {
    setLoading(true);
    setTimeout(() => {
      setPosts([post, ...posts]);
      setLoading(false);
    }, 700);
  }

  function handleSelect(id) {
    setSelectedPostId(id);
  }

  function handleUpvote(id) {
    setLoading(true);
    setTimeout(() => {
      setPosts(posts.map(p => p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p));
      setLoading(false);
    }, 500);
  }

  function handleComment(id, comment) {
    setLoading(true);
    setTimeout(() => {
      setPosts(posts.map(p => p.id === id ? { ...p, comments: [...p.comments, comment] } : p));
      setLoading(false);
    }, 500);
  }

  function handleEdit(id, updated) {
    setLoading(true);
    setTimeout(() => {
      setPosts(posts.map(p => p.id === id ? updated : p));
      setLoading(false);
    }, 700);
  }

  function handleDelete(id) {
    setLoading(true);
    setTimeout(() => {
      setPosts(posts.filter(p => p.id !== id));
      setSelectedPostId(null);
      setLoading(false);
    }, 700);
  }

  function handleBack() {
    setSelectedPostId(null);
  }

  const selectedPost = posts.find(p => p.id === selectedPostId);

  return (
    <div className={`app-container theme-${theme}`}>
      <header>
        <h1>🏀 Sports Forum</h1>
        <p>Share your passion for sports! Create posts, comment, upvote, and connect.</p>
        <ThemeSelector theme={theme} setTheme={setTheme} />
      </header>
      <main>
        {loading ? (
          <LoadingSpinner />
        ) : selectedPost ? (
          <PostPage
            post={selectedPost}
            onUpvote={handleUpvote}
            onComment={handleComment}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onBack={handleBack}
          />
        ) : (
          <>
            <PostForm onCreate={handleCreate} />
            <PostList
              posts={posts}
              onSelect={handleSelect}
              sortBy={sortBy}
              setSortBy={setSortBy}
              search={search}
              setSearch={setSearch}
              showContent={showContent}
              setShowContent={setShowContent}
              flagFilter={flagFilter}
              setFlagFilter={setFlagFilter}
            />
          </>
        )}
      </main>
      <footer>
        <p>Made with React + Vite | Sports Forum Project</p>
      </footer>
    </div>
  );
}

export default App
