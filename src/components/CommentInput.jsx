import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { postCommentByArticle } from '../utils/api';
import { useParams } from 'react-router-dom';

export default function CommentInput({ article_id, setComments, comments }) {
  const [input, setInput] = useState('');
  const [hasChanged, setHasChanged] = useState(false);
  const username = 'grumpy19';

  const handleChange = (event) => {
    setInput(event.target.value);
    setHasChanged(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const optimisticComment = {
      body: input,
      author: username,
      votes: 0,
    };
    setComments([optimisticComment, ...comments]);
    setInput('');

    postCommentByArticle(article_id, username, input).then(() =>
      setHasChanged(false)
    );
  };

  const enabled = hasChanged === true && input.length > 3;

  return (
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
        Send
      </Button>
    </Box>
  );
}
