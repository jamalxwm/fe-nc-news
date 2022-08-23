import './App.css';
import ArticleList from './components/ArticleList';
import { useState } from 'react';
import { Typography, CssBaseline } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <Typography variant="h1">Hello world!</Typography>
      <ArticleList />
    </div>
  );
}

export default App;
