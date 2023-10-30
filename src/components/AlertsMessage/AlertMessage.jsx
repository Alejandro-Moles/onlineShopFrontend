import React, { useState } from 'react';
import { Box, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import Slide from '@mui/material/Slide';
import './AlertMessage.css';

const AlertMessage = ({ message, severity, open, onClose }) => {
  const [state] = useState({
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal } = state;

  const handleClose = () => {
    onClose();
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide {...props} direction="down" ref={ref} />;
  });

  return (
    <Box className="portal-container" sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        autoHideDuration={1500}
        key={vertical + horizontal}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default AlertMessage;

