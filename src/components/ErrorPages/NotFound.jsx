import React from 'react';
import { Typography, Container } from '@mui/material';

const NotFound = () => {
  return (
    <Container maxWidth="lg" style={{ marginTop: '50px' }}>
      <Typography variant="h3" component="div" style={{ color: '#fff', textAlign: 'center' }}>
        Error 404 Page Not Found
      </Typography>
      <Typography variant="body1" style={{ color: '#fff', textAlign: 'center', marginTop: '20px' }}>
        The requested page could not be found.
      </Typography>
    </Container>
  );
};

export default NotFound;
