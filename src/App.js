import './App.css';
import ArticleList from './components/ArticleList';
import { Typography } from '@material-ui/core';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ArticleView from './components/ArticleView';

function App() {
  return (
    <div className="App">
      <Typography variant="h1">Hello world!</Typography>
      <NavBar />

      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/topic/:slug" element={<ArticleList />} />
        <Route path="/articles/:article_id" element={<ArticleView />} />
      </Routes>
    </div>
  );
}

export default App;
