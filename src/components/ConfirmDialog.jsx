import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmDialog(props) {
  const { open, handleDialogToggle, handleDelete, id } = props;
  return (
    <Dialog
      open={open}
      onClose={handleDialogToggle}
      aria-labelledby="confirm-delete"
      aria-describedby="confirm-delete"
    >
      <DialogTitle id="alert-dialog-title">
        {'Delete this comment?'}
      </DialogTitle>
      <DialogActions>
        <Button
          onClick={() => {
            handleDelete(id);
          }}
          color="warning"
        >
          Delete
        </Button>
        <Button onClick={handleDialogToggle} autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
