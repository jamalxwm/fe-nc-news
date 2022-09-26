import React, { useState, useEffect, useContext } from 'react';
import {
  deleteCommentByID,
  fetchCommentsByArticle,
  fetchUsers,
} from '../utils/api';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import CommentInput from './CommentInput';
import { RemoveCircle } from '@mui/icons-material';
import styles from '../styles/CommentList.module.css';
import { UserContext } from '../contexts/user';
import { IconButton } from '@mui/material';
import ConfirmDialog from './ConfirmDialog';

export default function CommentList({ articleAuthor, articleID }) {
  const [comments, setComments] = useState([]);
  const [userList, setUserList] = useState();
  const { loggedInUser } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [idToDelete, setIdToDelete] = useState();

  useEffect(() => {
    fetchCommentsByArticle(articleID).then((comments) => {
      setComments(comments);
    });
  }, [articleID, comments, loggedInUser]);

  useEffect(() => {
    fetchUsers().then((users) => {
      setUserList(users);
      setIsLoading(false);
    });
  }, []);

  const userInfo = (author) => {
    return userList.find((user) => user.username === author);
  };

  const handleDialogToggle = () => {
    setOpen(!open);
  };

  const handleDelete = async (id) => {
    setOpen(false);
    setIdToDelete(null);
    await deleteCommentByID(id).then((currComments) => {
      setComments(
        currComments.filter((comment) => comment.comment_id !== id)
      ).catch((err) => {
        setComments(...currComments);
      });
    });
  };

  if (isLoading) return <div></div>;

  return (
    <>
      <CommentInput
        article_id={articleID}
        setComments={setComments}
        comments={comments}
      />
      <List sx={{ width: '100%' }}>
        {comments.map((comment) => (
          <ListItem alignItems="flex-start" key={comment.comment_id}>
            <ListItemAvatar>
              <Avatar
                alt={comment.author}
                src={userInfo(comment.author).avatar_url}
              />
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{
                fontFamily: 'Manrope',
                fontWeight: 500,
              }}
              primary={userInfo(comment.author).name}
              secondaryTypographyProps={{ fontFamily: 'Manrope' }}
              secondary={
                <>
                  {comment.body}{' '}
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    <br />
                    {dayjs(comment.created_at).format('D MMM YY')}
                  </Typography>
                  <div
                    className={
                      loggedInUser === comment.author || loggedInUser === articleAuthor
                        ? styles.buttonWrapper
                        : styles.buttonHide
                    }
                  >
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        setOpen(!open);
                        setIdToDelete(comment.comment_id);
                      }}
                    >
                      <RemoveCircle color="warning" />
                    </IconButton>
                    <ConfirmDialog
                      open={open}
                      handleDialogToggle={handleDialogToggle}
                      handleDelete={handleDelete}
                      id={idToDelete}
                    />
                  </div>
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
