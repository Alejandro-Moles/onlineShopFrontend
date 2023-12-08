import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { TextField, FormControl, MenuItem, InputLabel, Select, Button, CircularProgress  } from '@mui/material';
import "./css/MakeOrderDialog.css";
import DeliveriesService from '../../services/deliveryService';
import PaymentService from '../../services/paymentService';
import CustomAlert from '../AlertsMessage/CustomAlert';
import OrderLogic from '../../scripts/OrderLogic';
import CartLogic from '../../scripts/CartLogic';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../scripts/Theme';
 
const MakeOrderDialog = ({ open, handleClose, user, address, cartItems, clearCart }) => {
  const [apartment, setApartment] = useState(address?.apartament || '');
  const [home, setHome] = useState(address?.home || '');
  const [street, setStreet] = useState(address?.street || '');
  const [email, setEmail] = useState(user?.mail || '');
  const [delivery, setDelivery] = useState([]);
  const [payments, setPayments] = useState([]);
  
  const [selectedDelivery, setSelectedDelivery] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');
  const [isLoading, setIsLoading] = useState(false);

  const showAlert = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setIsAlertOpen(true);
  };

  const fetchDelivery = async () => {
    try {
      const response = await DeliveriesService.getDeliveries();
      setDelivery(response.data);
    } catch (error) {
      console.error('Error fetching deliveries:', error);
    }
  };

  const fetchPayment = async () => {
    try {
      const response = await PaymentService.getPayment();
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching deliveries:', error);
    }
  };

  const renderTextField = (label, value, onChange, fullWidth, readOnly) => {
    return (
      <TextField
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        fullWidth={fullWidth}
        InputProps={{
          readOnly: readOnly,
        }}
      />
    );
  };

  const RenderSelect = ({ options, title, value, onChange }) => {
    return (
      <FormControl fullWidth>
        <InputLabel>{title}</InputLabel>
        <Select
          value={value}
          onChange={onChange}
          label={title}
        >
          {options.map((method) => (
            <MenuItem key={method.uuid} value={method.type}>
              {method.type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  useEffect(() => {
    setApartment(address?.apartament || '');
    setHome(address?.home || '');
    setStreet(address?.street || '');
    setEmail(user?.mail || '');
    fetchDelivery();
    fetchPayment();
  }, [address, user]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!selectedDelivery || !selectedPayment) {
      showAlert("You must select a payment and delivery method", "error");
      return;
    }
    doOrder();
  };

  const doOrder = async () =>{
    setIsLoading(true);
    const orderResult = await OrderLogic.placeOrder(address, user, selectedDelivery, selectedPayment, cartItems);
    setTimeout(async () => {
      setIsLoading(false);
      if (orderResult.success) {
        CartLogic.updateCartItemCount(0);
        showAlert(orderResult.message, "success");
        handleClose();
      } else {
        showAlert(orderResult.message, "error");
      }
    }, 1000);
    clearCart();
  }

  const handleDeliveryChange = (e) => {
    setSelectedDelivery(e.target.value);
  };

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={handleClose}>
        <CustomAlert
            message={alertMessage}
            severity={alertSeverity}
            open={isAlertOpen}
            onClose={() => setIsAlertOpen(false)}
            autoHideDuration={2000}
        />
        <DialogTitle>Make Your Order</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <div className="AddDataform-field">
              {renderTextField('User Mail', email, setEmail, true, true)}
            </div>
            <div className="AddDataform-field">
              {renderTextField('Street', street, setStreet, true, true)}
            </div>
            <div className="AddDataform-field">
              {renderTextField('Home', home, setHome, true, true)}
            </div>
            <div className="AddDataform-field">
              {renderTextField('Apartment', apartment, setApartment, true, true)}
            </div>
            <div className="AddDataform-field">
              <RenderSelect
                options={delivery}
                title="Delivery Method"
                value={selectedDelivery}
                onChange={handleDeliveryChange}
              />
            </div>
            <div className="AddDataform-field">
              <RenderSelect
                options={payments}
                title="Payment Method"
                value={selectedPayment}
                onChange={handlePaymentChange}
              />
            </div>
            <div className="AddDataform-field">
              <Button
                variant="contained"
                color="primary"
                fullWidth={true}
                onClick={handleFormSubmit}
              >
                {isLoading ? <CircularProgress size={24} color="primary" /> : 'Purchase'}
              </Button>
            </div>
          </FormControl>
        </DialogContent>
      </Dialog>
    </ThemeProvider>

  );
};

export default MakeOrderDialog;
