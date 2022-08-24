import { fetchArticleByID } from '../data-fetching';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

export default function ArticleView() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    fetchArticleByID(article_id).then((article) => {
      setArticle(article[0]);
    });
  }, [article_id]);

  return (
    <div>
      <Typography variant="h2">{article.title}</Typography>
      <Typography variant="h6">Author: {article.author}</Typography>
      <Typography variant="h6">Date: {article.created_at}</Typography>
      <Typography variant="h6">Votes: {article.votes}</Typography>
      <Typography variant="body1">{article.body}</Typography>
      <Typography variant="h6">Comments: {article.comment_count}</Typography>
    </div>
  );
}
