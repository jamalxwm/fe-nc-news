import './App.css';
import { Routes, Route, HashRouter } from 'react-router-dom';
import ArticleView from './components/Views/ArticleView';
import CommentList from './components/CommentList';
import ArticleGrid from './components/Views/HomeView';
import { useState } from 'react';
import { UserContext } from './contexts/user';
import Page404 from './components/Views/Page404';

function App() {
  const [loggedInUser, setLoggedInUser] = useState('happyamy2016');

  return (
    <HashRouter>
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <Routes>
          <Route path="/" element={<ArticleGrid />} />
          <Route path="/topic/:slug" element={<ArticleGrid />} />
          <Route path="/articles/:article_id" element={<ArticleView />} />
          <Route
            path="/articles/:article_id/comments"
            element={<CommentList />}
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </UserContext.Provider>
    </HashRouter>
  );
}

export default App;
