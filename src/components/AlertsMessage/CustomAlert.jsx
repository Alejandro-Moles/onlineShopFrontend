import React, { useState, useEffect } from 'react';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';

const CustomAlert = ({ message, severity, open, onClose, autoHideDuration }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(open);

  useEffect(() => {
    setIsAlertOpen(open);
  }, [open]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsAlertOpen(false);
    onClose();
  };

  return (
    <Snackbar
      open={isAlertOpen}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;
