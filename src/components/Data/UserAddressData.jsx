import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Select, MenuItem, InputLabel, FormControl, Button, Grid } from '@mui/material';
import './UserAddressData.css';
import ShopUserService from '../../services/shopUserService';
import PostalCodeService from '../../services/postalCodeService';
import CustomAlert from '../AlertsMessage/CustomAlert';
import UserAddressService from '../../services/userAddress'

const UserAddressData = () => {
    const { uuid } = useParams();
    const [formData, setFormData] = useState({
    apartament: '',
    home: '',
    street: '',
    postalcode: '',
    });
    const [user, setUser] = useState({
    mail: '',
    });

    const [postalCode, setPostalCode] = useState([]);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('info');

    const showAlert = (message, severity) => {
        setAlertMessage(message);
        setAlertSeverity(severity);
        setIsAlertOpen(true);
    };

    const fetchPostalCode = async () => {
        try {
        const response = await PostalCodeService.getPostalCode();
        setPostalCode(response.data);
        } catch (error) {
        console.error('Error fetching postal code:', error);
        }
    };

    const fetchUser = async () => {
        try {
        const response = await ShopUserService.getShopUser(uuid);
        setUser(response.data);
        } catch (error) {
        console.error('Error fetching user:', error);
        }
    };

    useEffect(() => {
        fetchUser();
        fetchPostalCode();
    }, [uuid]);

    const handleChange = (field) => (event) => {
        setFormData({ ...formData, [field]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isAnyFieldEmpty = Object.values(formData).some((value) => value === '');

        if (isAnyFieldEmpty) {
            showAlert("You have to fill in all the fields", "error")
            return;
        }

        try{
            await UserAddressService.createUserAddress({
                apartament: formData.apartament,
                home: formData.home,
                street: formData.street,
                isDeleted: false,
                postalCode: formData.postalcode,
                userMail: user.mail,
            });
            showAlert("Address successfully created", "success")
            window.location.href = '/';
        } catch (error){
            console.error('Error', error)
            showAlert("An error occurred while creating the address", "error")
        }
        
    };

    const renderSelect = (options) => (
        options.length > 0 ? (
        <Grid item xs={12}>
            <FormControl fullWidth>
            <InputLabel>Postal Code</InputLabel>
            <Select
                value={formData.postalcode}
                onChange={handleChange('postalcode')}
                label="Postal Code"
                variant="outlined"
            >
                {options.map((code) => (
                <MenuItem key={code.uuid} value={code.content}>
                    {code.content + " (" +code.cityName + " | " + code.countryName + ")"}
                </MenuItem>
                ))}
            </Select>
            </FormControl>
        </Grid>
        ) : null
    );

    const createTextField = (label, value, onChange, disabled = false) => (
        <Grid item xs={12}>
        <TextField
            fullWidth
            label={label}
            variant="outlined"
            value={value}
            onChange={onChange}
            disabled={disabled}
        />
        </Grid>
    );

    return (
        <div className='formContainer'>
            <CustomAlert
                message={alertMessage}
                severity={alertSeverity}
                open={isAlertOpen}
                onClose={() => setIsAlertOpen(false)}
                autoHideDuration={2000}
            />
            <form className='form' onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                {createTextField('User Mail', user.mail, undefined, true)}
                {createTextField('Apartment', formData.apartament, handleChange('apartament'))}
                {createTextField('Home', formData.home, handleChange('home'))}
                {createTextField('Street', formData.street, handleChange('street'))}
                {renderSelect(postalCode)}
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default UserAddressData;