import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import { Avatar, Typography, Paper, Grid, Button, IconButton, Dialog, DialogActions, DialogTitle, DialogContent, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import ShopUserService from "../../services/shopUserService";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../scripts/Theme';
import EditProfileDialog from '../Dialog/EditingProfileDialog';
import EditIcon from '@mui/icons-material/Edit';
import CustomAlert from '../AlertsMessage/CustomAlert';

const UserProfile = () => {
  const { uuid } = useParams();
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editDataDialogOpen, setEditDataDialogOpen] = useState(false);

  const [editedName, setEditedName] = useState("");
  const [editedSurname, setEditedSurname] = useState("");
  const [editedMail, setEditedMail] = useState("");

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');

  const handleEditButtonClick = () => {
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditDataButtonClick = () => {
    setEditedName(user.name || "");
    setEditedSurname(user.surname || "");
    setEditedMail(user.mail || "");

    setEditDataDialogOpen(true);
  };

  const handleEditDataDialogClose = () => {
    setEditDataDialogOpen(false);
  };

  useEffect(() => {
    loadUser();
  }, [uuid]);

  const loadUser = async () => {
    try {
        const result = await ShopUserService.getShopUser(uuid);
        setUser(result.data);
      } catch (error) {
        console.error('Error fetching product: ', error);
      }
  }
  
  const handleViewOrdersClick = () => {
    navigate(`/viewOrders/${uuid}`);
  };

  const showAlert = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setIsAlertOpen(true);
};

  const handleSaveButtonClick = async () => {
    try {
      const updatedUserData = {
        mail: editedMail,
        name: editedName,
        surName: editedSurname,
      };
      await ShopUserService.updateData(uuid, updatedUserData);
      handleEditDataDialogClose();
    } catch (error) {
      showAlert(error.response.data, 'error')
    }
  };

  return (
    <ThemeProvider theme={theme}>
          <CustomAlert
              message={alertMessage}
              severity={alertSeverity}
              open={isAlertOpen}
              onClose={() => setIsAlertOpen(false)}
              autoHideDuration={2000}
          />
        <div style={{ marginTop: 80, textAlign: 'center' }}>
            <Paper elevation={3} style={{ padding: 20, maxWidth: 400, margin: "auto" }}>
                <Avatar alt={user.name} src="/path-to-image.jpg" style={{ width: 150, height: 150, margin: 'auto' }} />

                <Grid container spacing={2} style={{ marginTop: 20 }}>
                <Grid item xs={12}>
                    <Typography variant="h5">
                      {user.name} {' '} {user.surname}
                        <IconButton onClick={handleEditDataButtonClick} size="small">
                            <EditIcon />
                        </IconButton>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" color="textSecondary">
                        Mail: {user.mail}
                    </Typography>
                </Grid>
                {user.birth && (
                    <Grid item xs={12}>
                    <Typography variant="body2" color="textSecondary">
                        Birth Date: {user.birth}
                    </Typography>
                    </Grid>
                )}
                </Grid>

                <div style={{ marginTop: 30 }}>
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEditButtonClick}
                    style={{ marginTop: 20 }}
                    >
                    Change Password
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleViewOrdersClick}
                        style={{ marginTop: 20, marginLeft: 30 }}
                    >
                        View Orders
                    </Button>
                </div>
            </Paper>
            <EditProfileDialog open={editDialogOpen} onClose={handleEditDialogClose} user={user} />
            <Dialog open={editDataDialogOpen} onClose={handleEditDataDialogClose}>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogContent>
                <TextField
                  label="Name"
                  fullWidth
                  defaultValue={user.name}
                  onChange={(e) => setEditedName(e.target.value)}
                  style={{ marginBottom: 20, marginTop: 10 }}
                />
                <TextField
                  label="Surname"
                  fullWidth
                  defaultValue={user.surname}
                  onChange={(e) => setEditedSurname(e.target.value)}
                  style={{ marginBottom: 20 }}
                />
                <TextField
                  label="Mail"
                  fullWidth
                  defaultValue={user.mail}
                  onChange={(e) => setEditedMail(e.target.value)}
                  style={{ marginBottom: 20 }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleEditDataDialogClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSaveButtonClick} color="primary">
                  Save
                </Button>
              </DialogActions>
            </Dialog>
        </div>
    </ThemeProvider>
  );
};

export default UserProfile;
