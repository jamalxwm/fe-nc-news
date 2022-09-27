import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { postCommentByArticle } from '../utils/api';
import { UserContext } from '../contexts/user';
import styles from '../styles/CommentList.module.css';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Collapse } from '@mui/material';

export default function CommentInput({ article_id, setComments, comments }) {
  const [input, setInput] = useState('');
  const [showError, setShowError] = useState(false);
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

    postCommentByArticle(article_id, loggedInUser, input)
      .then(() => setHasChanged(false))
      .catch(() => {
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 6000);
      });
  };

  const enabled = hasChanged === true && input.length > 3;

  return (
    <div className={styles.container}>
      <div className={styles.showError__true}>
        <Box sx={{ zIndex: 100000 }}>
          <Collapse in={showError}>
            <Alert
              severity="error"
              sx={{
                fontFamily: 'Manrope',
                textAlign: 'left',
                boxShadow: 5,
                border: 1,
                borderColor: '#c9184a',
              }}
            >
              <AlertTitle>Oops!</AlertTitle>
              Something went wrong — <strong>Try that again!</strong>
            </Alert>
          </Collapse>
        </Box>
      </div>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          '& .MuiTextField-root': { m: 1, width: '40ch' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
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
            fullWidth="true"
            value={input}
            onChange={handleChange}
            variant="standard"
            sx={{fontFamily: 'Manrope'}}
          />
        </div>
        <Button
          variant="contained"
          type="submit"
          endIcon={<SendIcon />}
          disabled={!enabled}
          sx={{ backgroundColor: '#0c33c5', fontFamily: 'Manrope' }}
        >
          Post
        </Button>
      </Box>
    </div>
  );
}
