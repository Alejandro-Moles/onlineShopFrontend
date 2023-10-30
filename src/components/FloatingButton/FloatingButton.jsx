import * as React from 'react';
import { Fab } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import Box from '@mui/material/Box';
import './FloatingButton.css'; 
import { Link } from 'react-router-dom';

export default function FloatingButton() {
  return (
    <Link className="nav-link" to="/dataPage">
      <Box
        className="floating-button-container"
        sx={{
          '& > :not(style)': { m: 1 },
        }}
      >
      <Fab variant="extended"  sx={{
          backgroundColor: '#EC6B22', 
          color: 'white', 
          '&:hover': {
            backgroundColor: '#ff4800', 
          },
        }} className='fab'>
        <FolderIcon sx={{ mr: 2 }} />
        Storage
      </Fab>
      </Box>
    </Link>
    
  );
}
