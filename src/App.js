import './App.css';
import ArticleList from './components/ArticleList';

import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ArticleView from './components/ArticleView';
import CommentList from './components/CommentList';
import Nav from './components/Nav';
import './index.css';
import ArticleGrid from './components/ArticleGrid';

function App() {
  return (
    <div className="App">
      <Nav />

      <Routes>
        <Route path="/" element={<ArticleGrid />} />
        <Route path="/topic/:slug" element={<ArticleList />} />
        <Route path="/articles/:article_id" element={<ArticleView />} />
        <Route
          path="/articles/:article_id/comments"
          element={<CommentList />}
        />
      </Routes>
    </div>
  );
}

export default App;
