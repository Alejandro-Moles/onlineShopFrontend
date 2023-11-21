import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CustomAlert from '../AlertsMessage/CustomAlert';
import ShopUserService from '../../services/shopUserService';

const EditProfileDialog = ({ open, onClose, user }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');

    const handleToggleShowPassword = (field) => {
        switch (field) {
        case 'currentPassword':
            setShowCurrentPassword(!showCurrentPassword);
            break;
        case 'newPassword':
            setShowNewPassword(!showNewPassword);
            break;
        case 'repeatPassword':
            setShowRepeatPassword(!showRepeatPassword);
            break;
        default:
            break;
        }
    };

    const validatePasswords = () => {
        if (!currentPassword || !newPassword || !repeatPassword) {
            showAlert("All password fields are required.", "error")
            return false;
        }

        if (newPassword !== repeatPassword) {
            showAlert("New password and repeat password must match.", "error")
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        if (validatePasswords()) {
            try{
                await ShopUserService.updatePassword(user.uuid, {oldPassword: currentPassword, newPassword: newPassword});
                showAlert("Password changed successfully", "success")
                onClose();
            } catch (error){
                showAlert("There was an error changing the password", "error")
            }
        }
    };

    const showAlert = (message, severity) => {
        setAlertMessage(message);
        setAlertSeverity(severity);
        setIsAlertOpen(true);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <DialogTitle>Edit Password</DialogTitle>
        <DialogContent>
            <TextField
            label="Current Password"
            type={showCurrentPassword ? 'text' : 'password'}
            fullWidth
            margin="normal"
            variant="outlined"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            InputProps={{
                endAdornment: (
                <IconButton onClick={() => handleToggleShowPassword('currentPassword')}>
                    {showCurrentPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
                ),
            }}
            />
            <TextField
            label="New Password"
            type={showNewPassword ? 'text' : 'password'}
            fullWidth
            margin="normal"
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
                endAdornment: (
                <IconButton onClick={() => handleToggleShowPassword('newPassword')}>
                    {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
                ),
            }}
            />
            <TextField
            label="Repeat Password"
            type={showRepeatPassword ? 'text' : 'password'}
            fullWidth
            margin="normal"
            variant="outlined"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            InputProps={{
                endAdornment: (
                <IconButton onClick={() => handleToggleShowPassword('repeatPassword')}>
                    {showRepeatPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
                ),
            }}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="secondary">
            Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
            Save
            </Button>
        </DialogActions>
            <CustomAlert
                message={alertMessage}
                severity={alertSeverity}
                open={isAlertOpen}
                onClose={() => setIsAlertOpen(false)}
                autoHideDuration={2000}
            />
        </Dialog>
    );
};

export default EditProfileDialog;
