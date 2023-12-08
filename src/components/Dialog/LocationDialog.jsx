import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Checkbox,
  IconButton,
  ListItemIcon,
  DialogActions,
  Button
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../scripts/Theme'; 

const LocationDialog = ({ open, onClose, userAddress, user, onSelect }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const handleToggle = (value) => () => {
    if (selectedItem === value) {
      value = null;
    }

    setSelectedItem(value);
  };

  const handleAddAddress = () => {
    onClose();
    navigate(`/userAddressData/${user.uuid}`);
  };

  const handleClose = () => {
    onClose();
    onSelect(selectedItem);
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>User Addresses</DialogTitle>
        <DialogContent>
          <List sx={{ width: '100%', maxWidth: 360 }}>
            {userAddress.map((address) => {
              const labelId = `checkbox-list-label-${address.uuid}`;

              return (
                <ListItem
                  key={address.uuid}
                  secondaryAction={
                    <IconButton edge="end" aria-label="comments">
                      <CommentIcon />
                    </IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton
                    role={undefined}
                    onClick={handleToggle(address)}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={selectedItem === address}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`${address.street}, ${address.home}`} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddAddress} color="primary">
            Add new address
          </Button>
          <Button onClick={handleClose} color="primary" disabled={!selectedItem}>
            Choose
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default LocationDialog;
