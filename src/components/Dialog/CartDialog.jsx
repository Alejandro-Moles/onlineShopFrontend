import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  TextField,
  DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomAlert from '../AlertsMessage/CustomAlert';
import './CartDialog.css';

const CartDialog = ({ open, onClose, onPurchase, cartItems, onRemoveItem, updateCartItems, loggeduser, location }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantityToDelete, setQuantityToDelete] = useState(1);
  const [isPurchaseButtonActive, setPurchaseButtonActive] = useState(false);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');

  useEffect(() => {
    setPurchaseButtonActive(cartItems.length > 0);
  }, [cartItems]);

  const handleRemoveItemClick = (item) => {
    if (item.quantity > 1) {
      setSelectedItem(item);
    } else {
      onRemoveItem(item.productUuid);
    }
  };

  const handleDeleteConfirmation = () => {
    if (selectedItem) {
      const updatedQuantity = selectedItem.quantity - quantityToDelete;
      const newQuantity = Math.max(updatedQuantity, 0);
      const updatedItem = { ...selectedItem, quantity: newQuantity };

      if (updatedItem.quantity <= 0) {
        onRemoveItem(updatedItem.productUuid);
        handleCancelDelete();
      } else {
        const updatedCart = cartItems.map((item) =>
          item.productUuid === updatedItem.productUuid ? updatedItem : item
        );
        updateCartItems(updatedCart);
        handleCancelDelete();
      }
      
    }
  };

  const handleCancelDelete = () => {
    setSelectedItem(null);
    setQuantityToDelete(1);
  };

  const handlePurchase = () => {
      if(loggeduser != null){
        if(location ==null){
          showAlert("To buy you need to select a location", "info")
          return;
        }
        onPurchase();
        onClose();
      }else{
        showAlert("To buy you need to be logged in", "info")
      }
  };

  const showAlert = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setIsAlertOpen(true);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <CustomAlert
          message={alertMessage}
          severity={alertSeverity}
          open={isAlertOpen}
          onClose={() => setIsAlertOpen(false)}
          autoHideDuration={2000}
      />

      <DialogTitle>Your Shopping Cart</DialogTitle>
      <DialogContent>
        <List>
          {/* Comprobar si cartItems esta lleno */}
          {cartItems.map((item) => (
            <ListItem
              key={item.productUuid}
              className={selectedItem?.productUuid === item.productUuid ? 'deleting' : ''}
            >
              <ListItemText primary={item.title} secondary={`Quantity: ${item.quantity}`} />
              <IconButton onClick={(e) => { e.stopPropagation(); handleRemoveItemClick(item); }}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </DialogContent>

     {isPurchaseButtonActive && (
        <DialogActions style={{ justifyContent: 'center' }}>
          <Button onClick={handlePurchase} color="primary">
            Purchase
          </Button>
        </DialogActions>
      )}
          
      {/* Confirmation Dialog */}
      <Dialog open={!!selectedItem} onClose={handleCancelDelete}>
        <DialogTitle>{`How many ${selectedItem?.title} do you want to delete?`}</DialogTitle>
        <DialogContent>
          <TextField
            type="number"
            label="Quantity"
            value={quantityToDelete}
            onChange={(e) => setQuantityToDelete(parseInt(e.target.value, 10) || 1)}
            inputProps={{ min: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmation} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>


    </Dialog>
  );
};

export default CartDialog;
