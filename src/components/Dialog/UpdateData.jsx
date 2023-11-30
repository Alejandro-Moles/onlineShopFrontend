import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
} from '@mui/material';
import "./css/AddDataDialog.css";
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

  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

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
        updateCategory(updateData[0], formData)
        break;
      case "platforms":
        updatePlatform(updateData[0], formData)
        break;
      case "payment":
        updatePayment(updateData[0], formData)
        break;
      case "delivery":
        updateDelivery(updateData[0], formData)
        break;
      case "genre":
        updateGenre(updateData[0], formData)
        break;
      case "products":
        updateProduct(updateData[0], formData)
        break;
    } 
  };

  const updateCategory = (inicialData, data) => {
    if (Object.keys(data).length === 0) {
      setIsDialogOpen(false);
      showAlert('The values are the same as those of the previous category.', 'info');
      return;
    }

    const isDeleted = inicialData.deleted === 'Yes' ? true : false;

    console.log(inicialData)
    CategoriesService.updateCategories(inicialData.uuid, { type: data.categoryType, isDeleted: isDeleted })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        showAlert('There has been an error when updating the category', 'error');
      });
  };

  const updatePlatform = (inicialData, data) => {
    if (Object.keys(data).length === 0) {
      setIsDialogOpen(false);
      showAlert('The values are the same as those of the platform.', 'info');
      return;
    }

    const isDeleted = inicialData.deleted === 'Yes' ? true : false;

    PlatformsService.updatePlatforms(inicialData.uuid, { type: data.platformType, isDeleted: isDeleted })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        showAlert('There has been an error when updating the platform', 'error');
      });
  };

  const updatePayment = (inicialData, data) => {
    if (Object.keys(data).length === 0) {
      setIsDialogOpen(false);
      showAlert('The values are the same as those of the payment.', 'info');
      return;
    }

    const isDeleted = inicialData.deleted === 'Yes' ? true : false;

    PaymentService.updatePayment(inicialData.uuid, { type: data.paymentType, isDeleted: isDeleted })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        showAlert('There has been an error when updating the payment', 'error');
      });
  };

  const updateDelivery = (inicialData, data) => {
    if (Object.keys(data).length === 0) {
      setIsDialogOpen(false);
      showAlert('The values are the same as those of the delivery.', 'info');
      return;
    }

    const isDeleted = inicialData.deleted === 'Yes' ? true : false;

    DeliveryService.updateDelivery(inicialData.uuid, { type: data.deliveryType, isDeleted: isDeleted })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        showAlert('There has been an error when updating the delivery', error);
      });
  };

  const updateGenre = (inicialData, data) => {
    if (Object.keys(data).length === 0) {
      setIsDialogOpen(false);
      showAlert('The values are the same as those of the genre.', 'info');
      return;
    }

    const isDeleted = inicialData.deleted === 'Yes' ? true : false;

    GenreService.updateGenre(inicialData.uuid, { type: data.genreType, isDeleted: isDeleted })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        showAlert('There has been an error when updating the genre', 'error');
      });
  };

  const updateProduct = (inicialData, data) => {
    if (Object.keys(data).length === 0) {
      setIsDialogOpen(false);
      showAlert('The values are the same as those of the product.', 'info');
      return;
    }
    
    if(!data.category){data.category = inicialData.category}
    if(!data.platform){data.platform = inicialData.platform}
    if(!data.pegi){data.pegi = inicialData.pegi}
    if(!data.productTitle){data.productTitle = inicialData.productTitle}
    if(!data.price){data.price = inicialData.price}
    if(!data.stock){data.stock = inicialData.stock}
    if(!data.description){data.description = inicialData.description}
    if(!data.isDigital){data.isDigital = inicialData.isDigital}

    const isDigital = data.digital === 'digital' ? true : false;
    const isDeleted = inicialData.deleted === 'Yes' ? true : false;

    ProductsService.updateProducts(inicialData.uuid, {
      category: data.category,
      platform: data.platform,
      pegi: data.pegi,
      title: data.productTitle,
      price: data.price,
      stock: data.stock,
      description: data.description,
      genres: data.genres,
      isDigital: isDigital,
      image: "image1",
      isDeleted: isDeleted
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
        <DialogTitle>Update Data</DialogTitle>
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
            Cancel
          </Button>
          <Button onClick={handleOpenDialog} color="primary">
            Update
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