import { fetchArticleByID } from '../data-fetching';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

export default function ArticleView() {
  const { article_id } = useParams();
  const [article, setArticle] = useState([]);

  useEffect(() => {
    fetchArticleByID(article_id).then((article) => setArticle(article));
  }, [article_id]);

  return (
    <div>
      <Typography variant='h2'>{article[0].title}</Typography>
      <Typography variant='h6'>Author: {article[0].author}</Typography>
      <Typography variant='h6'>Date: {article[0].created_at}</Typography>
      <Typography variant='h6'>Votes: {article[0].votes}</Typography>
      <Typography variant='body1'>{article[0].body}</Typography>
      <Typography variant='h6'>Comments: {article[0].comment_count}</Typography>
    </div>
  );
}
