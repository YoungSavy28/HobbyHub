import { useState } from 'react';
import './App.css';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import PostPage from './components/PostPage';

function App() {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [sortBy, setSortBy] = useState('createdAt');
  const [search, setSearch] = useState('');

  function handleCreate(post) {
    setPosts([post, ...posts]);
  }

  function handleSelect(id) {
    setSelectedPostId(id);
  }

  function handleUpvote(id) {
    setPosts(posts.map(p => p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p));
  }

  function handleComment(id, comment) {
    setPosts(posts.map(p => p.id === id ? { ...p, comments: [...p.comments, comment] } : p));
  }

  function handleEdit(id, updated) {
    setPosts(posts.map(p => p.id === id ? updated : p));
  }

  function handleDelete(id) {
    setPosts(posts.filter(p => p.id !== id));
    setSelectedPostId(null);
  }

  function handleBack() {
    setSelectedPostId(null);
  }

  const selectedPost = posts.find(p => p.id === selectedPostId);

  return (
    <div className="app-container">
      <header>
        <h1>🏀 Sports Forum</h1>
        <p>Share your passion for sports! Create posts, comment, upvote, and connect.</p>
      </header>
      <main>
        {selectedPost ? (
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
