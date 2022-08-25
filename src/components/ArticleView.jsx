import { fetchArticleByID, patchVotes } from '../utils/api';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { IconButton } from '@material-ui/core';
import { ThumbUp } from '@mui/icons-material';

export default function ArticleView() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [votes, setVotes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    fetchArticleByID(article_id).then((article) => {
      setArticle(article[0]);
    });
  }, [article_id]);

  const incrementVotes = () => {
    let incOrDec = 1;
    if (hasVoted) incOrDec = -1;

    setVotes((currVotes) => {
      return currVotes + incOrDec;
    });
    patchVotes(article.article_id, incOrDec).catch(() => {
      setVotes((currVotes) => {
        return currVotes + incOrDec;
      });
    });
    setHasVoted((curr) => !curr);
  };

  return (
    <div>
      <Typography variant="h2">{article.title}</Typography>
      <Typography variant="h6">Author: {article.author}</Typography>
      <Typography variant="h6">Date: {article.created_at}</Typography>
      <IconButton aria-label="like" onClick={incrementVotes}>
        <ThumbUp />
      </IconButton>
      <Typography variant="h6">Votes: {article.votes + votes}</Typography>
      <Typography variant="body1">{article.body}</Typography>
      <Typography variant="h6">Comments: {article.comment_count}</Typography>
    </div>
  );
}
