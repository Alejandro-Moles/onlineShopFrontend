import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function ConfirmationDialog(props) {
  const { open, onClose, onConfirmAction } = props;

  const handleCloseAndConfirm = () => {
    onConfirmAction();
    onClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to perform this action?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseAndConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmationDialog;
