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
import ConfirmationDialog from '../Dialog/ConfirmationDialog';

function UpdateDataDialog({ open, onClose, columns, tableType, updateData}) {

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  }

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

  const handleChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleUpdateData = async () => {
    switch (tableType){
      case "category":
        updateCategory(updateData[0].uuid, formData)
        break;
      case "platforms":
        updatePlatform(updateData[0].uuid, formData)
        break;
      case "payment":
        updatePayment(updateData[0].uuid, formData)
        break;
      case "delivery":
        updateDelivery(updateData[0].uuid, formData)
        break;
      case "genre":
        updateGenre(updateData[0].uuid, formData)
        break;
      case "products":
        updateProduct(updateData[0].uuid, formData)
        break;
    } 
  };

  const updateCategory = (uuid, data) => {
    if (Object.keys(data).length === 0) {
      setIsDialogOpen(false);
      showAlert('The values are the same as those of the previous category.', 'info');
      return;
    }
    CategoriesService.updateCategories(uuid, { type: data.categoryType, isDeleted: false })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        showAlert('There has been an error when updating the category', 'error');
      });
  };

  const updatePlatform = (uuid, data) => {
    if (Object.keys(data).length === 0) {
      setIsDialogOpen(false);
      showAlert('The values are the same as those of the platform.', 'info');
      return;
    }
    PlatformsService.updatePlatforms(uuid, { type: data.platformType, isDeleted: false })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        showAlert('There has been an error when updating the platform', 'error');
      });
  };

  const updatePayment = (uuid, data) => {
    if (Object.keys(data).length === 0) {
      setIsDialogOpen(false);
      showAlert('The values are the same as those of the payment.', 'info');
      return;
    }
    PaymentService.updatePayment(uuid, { type: data.paymentType, isDeleted: false })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        showAlert('There has been an error when updating the payment', 'error');
      });
  };

  const updateDelivery = (uuid, data) => {
    if (Object.keys(data).length === 0) {
      setIsDialogOpen(false);
      showAlert('The values are the same as those of the delivery.', 'info');
      return;
    }
    DeliveryService.updateDelivery(uuid, { type: data.deliveryType, isDeleted: false })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        showAlert('There has been an error when updating the delivery', 'error');
      });
  };

  const updateGenre = (uuid, data) => {
    if (Object.keys(data).length === 0) {
      setIsDialogOpen(false);
      showAlert('The values are the same as those of the genre.', 'info');
      return;
    }
    GenreService.updateGenre(uuid, { type: data.genreType, isDeleted: false })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        showAlert('There has been an error when updating the genre', 'error');
      });
  };

  const updateProduct = (uuid, data) => {
    if (Object.keys(data).length === 0) {
      setIsDialogOpen(false);
      showAlert('The values are the same as those of the product.', 'info');
      return;
    }
    if(!data.category){data.category = updateData[0].category}
    if(!data.platform){data.platform = updateData[0].platform}
    if(!data.pegi){data.pegi = updateData[0].pegi}
    if(!data.productTitle){data.productTitle = updateData[0].productTitle}
    if(!data.price){data.price = updateData[0].price}
    if(!data.weight){data.weight = updateData[0].weight}
    if(!data.stock){data.stock = updateData[0].stock}
    if(!data.description){data.description = updateData[0].description}
    if(!data.isDigital){data.isDigital = updateData[0].isDigital}

    const isDigital = data.digital === 'digital' ? true : false;

    ProductsService.updateProducts(uuid, {
      category: data.category,
      platform: data.platform,
      pegi: data.pegi,
      title: data.productTitle,
      price: data.price,
      weight: data.weight,
      stock: data.stock,
      description: data.description,
      isDigital: isDigital,
      image: "a",
      isDeleted: false
    })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        showAlert('There has been an error when updating the product', 'error');
      });
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
        <DialogTitle>Agregar Datos</DialogTitle>
      </div>
      <DialogContent className="AddData-container">
        <FormControl component="fieldset">
        {tableType === 'category' ? (
          <CategoryForm
            formData={formData}
            formErrors={formErrors}
            handleChange={handleChange}
            updateData={updateData}
          />
        ) : tableType === 'platforms' ? (
          <PlatformForm
            formData={formData}
            formErrors={formErrors}
            handleChange={handleChange}
            updateData={updateData}
          />
        ) : tableType === 'products' ? (
          <ProductForm
            formData={formData}
            handleChange={handleChange}
            updateData={updateData}
          />
        ) : tableType === 'delivery' ? (
          <DeliveryForm
            formData={formData}
            formErrors={formErrors}
            handleChange={handleChange}
            updateData={updateData}
          />
        ) : tableType === 'payment' ? (
          <PaymentForm
            formData={formData}
            formErrors={formErrors}
            handleChange={handleChange}
            updateData={updateData}
          />
        ) : tableType === 'genre' ? (
          <GenreForm
            formData={formData}
            formErrors={formErrors}
            handleChange={handleChange}
            updateData={updateData}
          />
        ) : null}
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Button onClick={handleClose} color="primary" sx={{ marginRight: '30px' }}>
            Cancelar
          </Button>
          <Button onClick={handleOpenDialog} color="primary">
            Actualizar
          </Button>
        </Box>
      </DialogActions>


      <ConfirmationDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onConfirmAction={handleUpdateData}
      />
    </Dialog>
  );
}

export default UpdateDataDialog;