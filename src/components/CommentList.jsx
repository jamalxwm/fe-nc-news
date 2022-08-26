import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCommentsByArticle } from '../utils/api';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import CommentInput from './CommentInput';

export default function CommentList() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchCommentsByArticle(article_id).then((comments) => {
      setComments(comments);
    });
  }, [article_id]);

  return (
    <>
      <CommentInput
        article_id={article_id}
        setComments={setComments}
        comments={comments}
      />
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {comments.map((comment) => (
          <ListItem alignItems="flex-start" key={comment.comment_id}>
            <ListItemAvatar>
              <Avatar
                alt={comment.author}
                src="https://source.unsplash.com/random"
              />
            </ListItemAvatar>
            <ListItemText
              primary={comment.author}
              secondary={
                <>
                  {comment.body}{' '}
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {dayjs(comment.created_at).format('D-MMM-YY')}
                  </Typography>
                </>
              }
            />
            <Divider variant="inset" component="li" />
          </ListItem>
        ))}
      </List>
    </>
  );
}
