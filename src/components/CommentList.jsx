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

export default function CommentList() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchCommentsByArticle(article_id).then((comments) => {
      console.log(comments);
      setComments(comments);
    });
  }, [article_id]);

  return (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {comments.map((comment) => (
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt={comment.author}
                src="https://source.unsplash.com/random"
              />
            </ListItemAvatar>
            <ListItemText
              primary={comment.author}
              secondary={<>{comment.body}</>}
            />
            <Divider variant="inset" component="li" />
          </ListItem>
        ))}
      </List>
    </>
  );
}
