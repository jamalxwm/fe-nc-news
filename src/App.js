import './App.css';
import ArticleList from './components/ArticleList';
import { useState } from 'react';
import { Typography, CssBaseline } from '@material-ui/core';
import { Link, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <Typography variant="h1">Hello world!</Typography>
      <NavBar />

      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/topic/:slug" element={<ArticleList />} />
      </Routes>
    </div>
  );
}

export default App;
