import React from 'react';
import { Typography, Container } from '@mui/material';

const ForbiddenPage = () => {
  return (
    <Container maxWidth="lg" style={{ marginTop: '50px' }}>
      <Typography variant="h3" component="div" style={{ color: '#fff', textAlign: 'center' }}>
        Error 403 Forbidden Page
      </Typography>
      <Typography variant="body1" style={{ color: '#fff', textAlign: 'center', marginTop: '20px' }}>
        You do not have permissions to access this page
      </Typography>
    </Container>
  );
};

export default ForbiddenPage;
