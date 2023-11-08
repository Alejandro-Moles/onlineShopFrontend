import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
} from '@mui/material';
import "./AddDataDialog.css";
import Box from '@mui/material/Box';
import CategoriesService from '../../services/categoriesService';
import PlatformsService from '../../services/platformsService';
import PaymentService from '../../services/paymentService';
import DeliveryService from '../../services/deliveryService';
import GenreService from '../../services/genreService';
import ProductsService from '../../services/productService';
import CategoryForm from './Forms/CategoryForm';
import PlatformForm from './Forms/PlatformForm';
import ProductForm from './Forms/ProductsForm';
import DeliveryForm from './Forms/DeliveryForm';
import PaymentForm from './Forms/PaymentForm';
import GenreForm from './Forms/GenreForm';
import CustomAlert from '../AlertsMessage/CustomAlert';

function AddDataDialog({ open, onClose, columns, tableType}) {

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');

  const showAlert = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setIsAlertOpen(true);
  };

  //DIALOG
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  //REQUIREMENTS
  const requiredFieldsProduct = ['category', 'platform', 'productTitle', 'price', 'weight', 'stock', 'pegi', 'digital', 'description'];
  const requiredFieldsCategory = ['categoryType'];
  const requiredFieldsPlatform = ['platformType'];
  const requiredFieldsPayment = ['paymentType'];
  const requiredFieldsDelivery = ['deliveryType'];
  const requiredFieldsGenre = ['genreType'];

  const handleClose = () => {
    setOpenDialog(false);
    setIsAlertOpen(false);
    onClose();
    setFormData({});
  };

  const handleChange = (fieldName, value, columnName) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  async function handleCategoryForm(formData) {
    const isFormValid = requiredFieldsCategory.every(field => formData[field]);
    if (!isFormValid) {
      showAlert('Please fill in all the fields to enter the category.', 'error');
      return;
    }
    const categoryData = {
      type: formData.categoryType,
    };
    try {
      const response = await CategoriesService.createCategory(categoryData);
      showAlert('Category successfully added', 'success');
      handleClose();
      window.location.reload();
    } catch (error) {
      showAlert('An error occurred while adding the category ' + error, 'error');
    }
  }

  async function handlePlatformForm(formData) {
    const isFormValid = requiredFieldsPlatform.every(field => formData[field]);
    if (!isFormValid) {
      showAlert('Please fill in all the fields to enter the platform.', 'error');
      return;
    }
    const platformData = {
      type: formData.platformType,
    };
    try {
      const response = await PlatformsService.createPlatform(platformData);
      handleClose();
      window.location.reload();
    } catch (error) {
      showAlert('An error occurred while adding the platform ' + error, 'error');
    }
  }

  async function handlePaymentsForm(formData) {
    const isFormValid = requiredFieldsPayment.every(field => formData[field]);
    if (!isFormValid) {
      showAlert('Please fill in all the fields to enter the payment.', 'error');
      return;
    }
    const paymentData = {
      type: formData.paymentType,
    };
    try {
      const response = await PaymentService.createPayment(paymentData);
      console.log('Payment added successfully:', response.data);
      handleClose();
      window.location.reload();
    } catch (error) {
      showAlert('An error occurred while adding the payment ' + error, 'error');
    }
  }

  async function handleDeliveryForm(formData) {
    const isFormValid = requiredFieldsDelivery.every(field => formData[field]);
    if (!isFormValid) {
      showAlert('Please fill in all the fields to enter the delivery.', 'error');
      return;
    }
    const deliveryData = {
      type: formData.deliveryType,
    };
    try {
      const response = await DeliveryService.createDelivery(deliveryData);
      console.log('Delivery added successfully:', response.data);
      handleClose();
      window.location.reload();
    } catch (error) {
      showAlert('An error occurred while adding the delivery ' + error, 'error');
    }
  }

  async function handleGenreForm(formData) {
    const isFormValid = requiredFieldsGenre.every(field => formData[field]);
    if (!isFormValid) {
      showAlert('Please fill in all the fields to enter the genre.', 'error');
      return;
    }
    const genreData = {
      type: formData.genreType,
    };
    try {
      const response = await GenreService.createGenre(genreData);
      console.log('Genre added successfully:', response.data);
      handleClose();
      window.location.reload();
    } catch (error) {
      showAlert('An error occurred while adding the genre ' + error, 'error');
    }
  }

  async function handleProductForm(formData) {
    console.log(formData);
    const isFormValid = requiredFieldsProduct.every(field => formData[field]);
    if (!isFormValid) {
      showAlert('Please fill in all the fields to enter the product.', 'error');
      return;
    }

    const isDigital = formData.digital === 'digital' ? true : false;
    console.log(isDigital);

    const productData = {
      category: formData.category,
      platform: formData.platform,
      title: formData.productTitle,
      price: formData.price,
      weight: formData.weight,
      stock: formData.stock,
      pegi: formData.pegi,
      isDigital: isDigital,
      description: formData.description,
      image: "image1",
    };
    try {
      const response = await ProductsService.createProduct(productData);
      console.log('Product added successfully:', response.data);
      handleClose();
      window.location.reload();
    } catch (error) {
      showAlert('An error occurred while adding the product ' + error, 'error');
    }
  }

  const handleAddData = async () => {
    switch (tableType){
      case "category":
        handleCategoryForm(formData);
        break;
      case "platforms":
        handlePlatformForm(formData);
        break;
      case "payment":
        handlePaymentsForm(formData);
        break;
      case "delivery":
        handleDeliveryForm(formData);
        break;
      case "genre":
        handleGenreForm(formData);
        break;
      case "products":
        handleProductForm(formData);
        break;
    } 
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">

      <CustomAlert
        message={alertMessage}
        severity={alertSeverity}
        open={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        autoHideDuration={2000}
      />

      <div className="AddDataDialogTitle">
        <DialogTitle>Add Data</DialogTitle>
      </div>
      <DialogContent className="AddData-container">
        <FormControl component="fieldset">
        {tableType === 'category' ? (
          <CategoryForm
            formData={formData}
            formErrors={formErrors}
            handleChange={handleChange}
          />
        ) : tableType === 'platforms' ? (
          <PlatformForm
            formData={formData}
            formErrors={formErrors}
            handleChange={handleChange}
          />
        ) : tableType === 'products' ? (
          <ProductForm
            formData={formData}
            handleChange={handleChange}
          />
        ) : tableType === 'delivery' ? (
          <DeliveryForm
            formData={formData}
            formErrors={formErrors}
            handleChange={handleChange}
          />
        ) : tableType === 'payment' ? (
          <PaymentForm
            formData={formData}
            formErrors={formErrors}
            handleChange={handleChange}
          />
        ) : tableType === 'genre' ? (
          <GenreForm
            formData={formData}
            formErrors={formErrors}
            handleChange={handleChange}
          />
        ) : null}
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Button onClick={handleClose} color="primary" sx={{ marginRight: '30px' }}>
            Cancel
          </Button>
          <Button onClick={handleAddData} color="primary">
            Add
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default AddDataDialog;