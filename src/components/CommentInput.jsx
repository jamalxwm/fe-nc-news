import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { postCommentByArticle } from '../utils/api';
import { UserContext } from '../contexts/user';
import styles from '../styles/CommentList.module.css'

export default function CommentInput({ article_id, setComments, comments }) {
  const [input, setInput] = useState('');
  const [hasChanged, setHasChanged] = useState(false);
  const { loggedInUser } = useContext(UserContext);

  const handleChange = (event) => {
    setInput(event.target.value);
    setHasChanged(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const optimisticComment = {
      body: input,
      author: loggedInUser,
      votes: 0,
    };
    setComments([optimisticComment, ...comments]);
    setInput('');

    postCommentByArticle(article_id, loggedInUser, input).then(() =>
      setHasChanged(false)
    );
  };

  const enabled = hasChanged === true && input.length > 3;

  return (
    <div className={styles.container}>
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        '& .MuiTextField-root': { m: 1, width: '40ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="standard-multiline-flexible"
          label="Leave a comment"
          multiline
          maxRows={4}
          value={input}
          onChange={handleChange}
          variant="standard"
        />
      </div>
      <Button
        variant="contained"
        type="submit"
        endIcon={<SendIcon />}
        disabled={!enabled}
      >
        Post
      </Button>
    </Box>
    </div>
  );
}
