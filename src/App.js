import './App.css';
import ArticleList from './components/ArticleList';
import { Routes, Route } from 'react-router-dom';
import ArticleView from './components/Views/ArticleView';
import CommentList from './components/CommentList';
import Nav from './components/Nav';
import './index.css';
import ArticleGrid from './components/Views/ArticleGrid';
import { useState } from 'react';
import { UserContext } from './contexts/user';
import Page404 from './components/Views/Page404';

function App() {
  const [loggedInUser, setLoggedInUser] = useState('happyamy2016');

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      <div className="App">
        <Routes>
          
          <Route path="/" element={<ArticleGrid />} />
          <Route path="/topic/:slug" element={<ArticleList />} />
          <Route path="/articles/:article_id" element={<ArticleView />} />
          <Route
            path="/articles/:article_id/comments"
            element={<CommentList />}
          />
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
