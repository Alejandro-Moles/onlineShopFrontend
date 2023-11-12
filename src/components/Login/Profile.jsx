import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Avatar, Typography, Paper, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ShopUserService from "../../services/shopUserService";

const UserProfile = () => {

    const { uuid } = useParams();
    const [user, setUser] = useState("");

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

    return (
        <div style={{ marginTop: 80 }}>
            <Paper elevation={3} style={{ padding: 20, maxWidth: 400, margin: "auto" }}>
            <Grid container spacing={2} justifyContent="center">
                <Grid item>
                <Avatar alt={user.name} src="/path-to-image.jpg" />
                </Grid>
                <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                    <Grid item>
                    <Typography variant="h5">{user.name}</Typography>
                    </Grid>
                    <Grid item>
                    <Typography variant="body2" color="textSecondary">
                        Email: {user.mail}
                    </Typography>
                    </Grid>
                    {/* Agrega más información del usuario según tus necesidades */}
                </Grid>
                </Grid>
            </Grid>

            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/edit-profile"
                style={{ marginTop: 20 }}
            >
                Editar Perfil
            </Button>
            </Paper>
        </div>
    );
};

export default UserProfile;
