import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import { Avatar, Typography, Paper, Grid, Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import ShopUserService from "../../services/shopUserService";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../Theme';
import EditProfileDialog from '../Dialog/EditingProfileDialog';
import EditIcon from '@mui/icons-material/Edit';

const UserProfile = () => {
  const { uuid } = useParams();
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleEditButtonClick = () => {
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
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

  return (
    <ThemeProvider theme={theme}>
        <div style={{ marginTop: 80, textAlign: 'center' }}>
            <Paper elevation={3} style={{ padding: 20, maxWidth: 400, margin: "auto" }}>
                <Avatar alt={user.name} src="/path-to-image.jpg" style={{ width: 150, height: 150, margin: 'auto' }} />

                <Grid container spacing={2} style={{ marginTop: 20 }}>
                <Grid item xs={12}>
                    <Typography variant="h5">
                        {user.name} 
                        {user.surname}
                        <IconButton onClick={handleEditButtonClick} size="small">
                            <EditIcon />
                        </IconButton>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" color="textSecondary">
                        Mail: {user.mail}
                        <IconButton onClick={handleEditButtonClick} size="small">
                            <EditIcon />
                        </IconButton>
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
        </div>
    </ThemeProvider>
  );
};

export default UserProfile;
