import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Paper } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import "./css/DataPage.css"
import theme from '../../scripts/Theme';
import TableComponent from './TableComponent';
import CategoriesService from '../../services/categoriesService';
import PlatformsService from '../../services/platformsService';
import ProductService from '../../services/productService';
import DeliveriesService from '../../services/deliveryService';
import PaymentService from '../../services/paymentService';
import GenreService from '../../services/genreService';
import AlertMessage from '../AlertsMessage/AlertMessage';
import ShopUserService from '../../services/shopUserService';

const DataPage = () => { 
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');

  const [isEmployee, setIsEmployee] = useState(false);

  const showAlertMessage = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setIsAlertOpen(true);
  };
  
  const [tableData, setTableData] = useState({
    categories: [],
    platforms: [],
    products: [],
    payments: [],
    deliveries: [],
    genres: [],
    shopUsers: [],
    userAddress: [],
  });

  const deleteCategory = (uuid, type) => {
    CategoriesService.updateCategories(uuid, { type, isDeleted: true })
      .then((response) => {
        showAlertMessage('Category successfully removed, reload the page to see the changes.', 'success');
      })
      .catch((error) => {
        showAlertMessage('An error occurred while deleting the category: ' + error, 'error');
      });
  };

  const deletePlatform = (uuid, type) => {
    PlatformsService.updatePlatforms(uuid, { type, isDeleted: true })
    .then((response) => {
      showAlertMessage('Platform successfully removed, reload the page to see the changes.', 'success');
    })
    .catch((error) => {
      showAlertMessage('An error occurred while deleting the platform: ' + error, 'error');
    });
  };

  const deleteProduct = (uuid) => {
    ProductService.deleteProducts(uuid)
    .then((response) => {
      showAlertMessage('Products successfully removed, reload the page to see the changes.', 'success');
    })
    .catch((error) => {
      showAlertMessage('An error occurred while deleting the products: ' + error, 'error');
    });
  };

  const deletePayment = (uuid, type) => {
    PaymentService.updatePayment(uuid, { type, isDeleted: true })
    .then((response) => {
      showAlertMessage('Payment successfully removed, reload the page to see the changes.', 'success');
    })
    .catch((error) => {
      showAlertMessage('An error occurred while deleting the payment: ' + error, 'error');
    });
  };

  const deleteDelivery = (uuid, type) => {
    DeliveriesService.updateDelivery(uuid, { type, isDeleted: true })
    .then((response) => {
      showAlertMessage('Delivery successfully removed, reload the page to see the changes.', 'success');
    })
    .catch((error) => {
      showAlertMessage('An error occurred while deleting the delivery: ' + error, 'error');
    });
  };

  const deleteGenre = (uuid, type) => {
    GenreService.updateGenre(uuid, { type, isDeleted: true })
    .then((response) => {
      showAlertMessage('Genre successfully removed, reload the page to see the changes.', 'success');
    })
    .catch((error) => {
      showAlertMessage('An error occurred while deleting the genre: ' + error, 'error');
    });
  };

  useEffect(() => {
    const fetchData = async (service, mapData, key) => {
      try {
        const response = await service();
        const mappedData = response.data.map(mapData);
        setTableData((prevState) => ({
          ...prevState,
          [key]: mappedData,
        }));
      } catch (error) {
        console.error(`Error fetching ${key}:`, error);
      }
    };
    const fetchDataFor = (service, mapData, key) => fetchData(service, mapData, key);

    fetchDataFor(CategoriesService.getCategories, (category, index) => ({
      id: index + 1,
      uuid: category.uuid,
      categoryType: category.type,
      deleted: category.isDeleted ? 'Yes' : 'No',
    }), 'categories');

    fetchDataFor(PlatformsService.getPlatforms, (platforms, index) => ({
      id: index + 1,
      uuid: platforms.uuid,
      platformsType: platforms.type,
      deleted: platforms.isDeleted ? 'Yes' : 'No',
    }), 'platforms');

    fetchDataFor(ProductService.getProducts, (products, index) => ({
      id: index + 1,
      image: products.image,
      uuid: products.uuid,
      category: products.category,
      platform: products.platform,
      pegi: products.pegi,
      productTitle: products.title,
      price: products.price,
      stock: products.stock,
      description: products.description,
      genres: products.genres.map(genre => genre).join(', '),
      digital: products.isDigital ? 'Yes' : 'No',
      deleted: products.isDeleted ? 'Yes' : 'No',
    }), 'products');

    fetchDataFor(PaymentService.getPayment, (payments, index) => ({
      id: index + 1,
      uuid: payments.uuid,
      paymentType: payments.type,
      deleted: payments.isDeleted ? 'Yes' : 'No',
    }), 'payments');

    fetchDataFor(DeliveriesService.getDeliveries, (deliveries, index) => ({
      id: index + 1,
      uuid: deliveries.uuid,
      deliveryType: deliveries.type,
      deleted: deliveries.isDeleted ? 'Yes' : 'No',
    }), 'deliveries');

    fetchDataFor(GenreService.getGenres, (genres, index) => ({
      id: index + 1,
      uuid: genres.uuid,
      genreType: genres.type,
      deleted: genres.isDeleted ? 'Yes' : 'No',
    }), 'genres');

    const token = localStorage.getItem('token');
    if (token) {
        ShopUserService.getActualShopUser(token)
            .then(response => {
                setIsEmployee(response.data.roles.includes('EMPLOYEE'));
            })
            .catch(error => {
                console.error('Error al cargar al usuario');
            })
    }
  }, []);

  const tableColumns = [
    // Para "Categories"
    [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'uuid', hideable: true },
      { field: 'categoryType', headerName: 'Category', width: 130 },
      { field: 'deleted', headerName: 'Deleted', width: 90 },
    ],
    // Para "Platforms"
    [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'uuid', hideable: true },
      { field: 'platformsType', headerName: 'Platform', width: 130 },
      { field: 'deleted', headerName: 'Deleted', width: 90 },
    ],
    // Para "Products"
    [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'image', hideable: true },
      { field: 'uuid', hideable: true },
      { field: 'category', headerName: 'Category', width: 130 },
      { field: 'platform', headerName: 'Platform', width: 130 },
      { field: 'productTitle', headerName: 'Title', width: 200 },
      { field: 'price', headerName: 'Price', width: 90 },
      { field: 'stock', headerName: 'Stock', width: 90 },
      { field: 'pegi', headerName: 'PEGI', width: 130 },
      { field: 'digital', headerName: 'Digital', width: 90 },
      { field: 'genres', headerName: 'Genres', width: 150 },
      { field: 'description', headerName: 'Description', width: 200 },
      { field: 'deleted', headerName: 'Deleted', width: 90 },
    ],
    // Para "Payments"
    [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'uuid', hideable: true },
      { field: 'paymentType', headerName: 'Payments', width: 130 },
      { field: 'deleted', headerName: 'Deleted', width: 90 },
    ],
    // Para "Deliveries"
    [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'uuid', hideable: true },
      { field: 'deliveryType', headerName: 'Delivery', width: 130 },
      { field: 'deleted', headerName: 'Deleted', width: 90 },
    ],
    // Para "Genres"
    [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'uuid', hideable: true },
      { field: 'genreType', headerName: 'Genre', width: 130 },
      { field: 'deleted', headerName: 'Deleted', width: 90 },
    ],
  ];

  const deleteHandlerFunctions = [
    deleteCategory,
    deletePlatform,
    deleteProduct,
    deletePayment,
    deleteDelivery,
    deleteGenre,
  ];

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!isEmployee) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="full-page">
        <Paper square>
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            className="custom-tabs"
            centered
          >
            <Tab label="Category" sx={{ color: 'white', fontWeight: 'bold' }} />
            <Tab label="Platforms" sx={{ color: 'white', fontWeight: 'bold' }} />
            <Tab label="Products" sx={{ color: 'white', fontWeight: 'bold' }} />
            <Tab label="Payments" sx={{ color: 'white', fontWeight: 'bold' }} />
            <Tab label="Deliveries" sx={{ color: 'white', fontWeight: 'bold' }} />
            <Tab label="Genres" sx={{ color: 'white', fontWeight: 'bold' }} />
          </Tabs>
        </Paper>

        <div className="centered-content">
          <TableComponent
            columns={tableColumns[value]}
            data={tableData[Object.keys(tableData)[value]]}
            deleteDataBaseHandler={deleteHandlerFunctions[value]}
            type={value}
          />
        </div>
        <AlertMessage
          open={isAlertOpen}
          message={alertMessage}
          severity={alertSeverity}
          onClose={() => setIsAlertOpen(false)}
        />
      </div>
    </ThemeProvider>
  );
};

export default DataPage;
