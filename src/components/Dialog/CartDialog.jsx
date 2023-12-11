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
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomAlert from '../AlertsMessage/CustomAlert';
import './css/CartDialog.css';
import theme from '../../scripts/Theme';
import CartLogic from '../../scripts/CartLogic';
import { ThemeProvider } from '@mui/material/styles';
import ProductService from '../../services/productService';
 
const CartDialog = ({ open, onClose, onPurchase, cartItems, onRemoveItem, updateCartItems, loggeduser, location }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantityToDelete, setQuantityToDelete] = useState(1);
  const [isPurchaseButtonActive, setPurchaseButtonActive] = useState(false);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');

  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    setPurchaseButtonActive(cartItems.length > 0);

    const fetchProductDetails = async () => {
      try {
        const productDetailsWithProductData = await Promise.all(
          cartItems.map(async (item) => {
            try {
              const product = await ProductService.getProduct(item.productUuid);
              return {
                ...item,
                productTitle: product.data.title,
                productPlatform: product.data.platform,
                productCategory: product.data.category,
                productFormat: product.data.isDigital,
              };
            } catch (error) {
              console.error('Error fetching product details:', error);
              return item;
            }
          })
        );
        console.log(productDetailsWithProductData)
        setProductDetails(productDetailsWithProductData);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [cartItems]);


  const handleRemoveItemClick = (item) => {
    if (item.quantity > 1) {
      setSelectedItem(item);
    } else {
      onRemoveItem(item.productUuid);
      notifyCartUpdated(1);
    }
  };

  const handleDeleteConfirmation = async () => {
    if (selectedItem) {
      const updatedQuantity = selectedItem.quantity - quantityToDelete;
      const newQuantity = Math.max(updatedQuantity, 0);
      const updatedItem = { ...selectedItem, quantity: newQuantity };
      notifyCartUpdated(quantityToDelete);
      
        if (updatedItem.quantity <= 0) {
          onRemoveItem(updatedItem.productUuid);
          handleCancelDelete();
        } else {
        const updatedCart = cartItems.map((item) =>
          item.productUuid === updatedItem.productUuid ? updatedItem : item
        );
        updateCartItems(updatedCart);
        try {
          await CartLogic.updateProductStock(
            updatedItem.productUuid,
            quantityToDelete,
            true
          );
        } catch (error) {
          console.error("Error updating product stock:", error);
        }
        handleCancelDelete();
      }
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
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

  const notifyCartUpdated = (quantity) => {
    CartLogic.restToCartCount(quantity);
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={onClose}>
        <CustomAlert
          message={alertMessage}
          severity={alertSeverity}
          open={isAlertOpen}
          onClose={() => setIsAlertOpen(false)}
          autoHideDuration={2000}
        />
    
        <DialogTitle style={{ textAlign: 'center' }}>Your Shopping Cart</DialogTitle>
        <DialogContent>
          {cartItems.length > 0 ? (
            <List>
            {productDetails.map((item) => (
              <ListItem
                key={item.productUuid}
                className={selectedItem?.productUuid === item.productUuid ? 'deleting' : ''}
              >
                <ListItemText
                  primary={
                    <Typography component="div">
                      <div>
                        <span style={{ fontWeight: 'bold' }}>{`${item.productTitle}`}</span> - {item.productCategory}
                      </div>
                      <div style={{ marginTop: '4px' }}>{item.productPlatform} - {item.productFormat ? 'Digital' : 'Physical'}</div>
                    </Typography>
                  }
                  secondary={`Quantity: ${item.quantity} : $${(item.price * item.quantity).toFixed(2)}`}
                />
                <IconButton style={{ marginLeft: '20px' }} onClick={(e) => { e.stopPropagation(); handleRemoveItemClick(item); }}>
                  <DeleteIcon color="error" />
                </IconButton>
              </ListItem>
            ))}
          </List>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </DialogContent>
    
         {isPurchaseButtonActive && (
          <DialogActions style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="body1" color="textSecondary" style={{ marginBottom: '8px' }}>
              Total Price: ${getTotalPrice().toFixed(2)}
            </Typography>
            <Button onClick={handlePurchase} color="primary">
              Purchase
            </Button>
          </DialogActions>
        )}
    
        <Dialog open={!!selectedItem} onClose={handleCancelDelete}>
          <DialogTitle>{`How many ${selectedItem?.title} do you want to delete?`}</DialogTitle>
          <DialogContent>
            <TextField
              type="number"
              label="Quantity"
              value={quantityToDelete}
              onChange={(e) => setQuantityToDelete(parseInt(e.target.value, 10) || 1)}
              inputProps={{ min: 1, max: selectedItem?.quantity || 1 }}
              fullWidth  
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
    </ThemeProvider>
  );
};

export default CartDialog;
