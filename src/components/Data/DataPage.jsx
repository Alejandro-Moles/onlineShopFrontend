import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Paper } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import "./DataPage.css"
import theme from '../Theme';
import TableComponent from './TableComponent';
import CategoriesService from '../../services/categoriesService';
import PlatformsService from '../../services/platformsService';
import ProductService from '../../services/productService';
import CountriesService from '../../services/countryService';
import CitiesService from '../../services/cityService';
import PostalCodeService from '../../services/postalCodeService';
import DeliveriesService from '../../services/deliveryService';
import PaymentService from '../../services/paymentService';
import GenreService from '../../services/genreService';
import UserAddressService from '../../services/userAddress';
import ShopUserService from '../../services/shopUserService';

const DataPage = () => {
  const [tableData, setTableData] = useState({
    categories: [],
    platforms: [],
    products: [],
    countries: [],
    cities: [],
    postalCode: [],
    payments: [],
    deliveries: [],
    genres: [],
    users: [],
    userAddress: [],
  });

  const deleteCategory = (uuid, type) => {
    CategoriesService.updateCategories(uuid, { type, isDeleted: true })
      .then((response) => {
        console.log('Categoría actualizada con éxito:', response.data);
      })
      .catch((error) => {
        console.error('Error al actualizar la categoría:', error);
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
      category: category.type,
      deleted: category.isDeleted ? 'Yes' : 'No',
    }), 'categories');

    fetchDataFor(PlatformsService.getPlatforms, (platforms, index) => ({
      id: index + 1,
      uuid: platforms.uuid,
      platforms: platforms.type,
      deleted: platforms.isDeleted ? 'Yes' : 'No',
    }), 'platforms');

    fetchDataFor(ProductService.getProducts, (products, index) => ({
      id: index + 1,
      uuid: products.uuid,
      category: products.category,
      platform: products.platform,
      pegi: products.pegi,
      title: products.title,
      price: products.price,
      weight: products.weight,
      stock: products.stock,
      description: products.description,
      digital: products.digital ? 'Yes' : 'No',
      deleted: products.isDeleted ? 'Yes' : 'No',
    }), 'products');

    fetchDataFor(CountriesService.getCountries, (countries, index) => ({
      id: index + 1,
      uuid: countries.uuid,
      country: countries.name,
      deleted: countries.isDeleted ? 'Yes' : 'No',
    }), 'countries');

    fetchDataFor(CitiesService.getCities, (cities, index) => ({
      id: index + 1,
      uuid: cities.uuid,
      city: cities.name,
      country: cities.countryName,
      deleted: cities.isDeleted ? 'Yes' : 'No',
    }), 'cities');

    fetchDataFor(PostalCodeService.getPostalCode, (postalCode, index) => ({
      id: index + 1,
      uuid: postalCode.uuid,
      postalCode: postalCode.content,
      city: postalCode.cityName,
      country: postalCode.countryName,
      deleted: postalCode.isDeleted ? 'Yes' : 'No',
    }), 'postalCode');

    fetchDataFor(PaymentService.getPayment, (payments, index) => ({
      id: index + 1,
      uuid: payments.uuid,
      payment: payments.type,
      deleted: payments.isDeleted ? 'Yes' : 'No',
    }), 'payments');

    fetchDataFor(DeliveriesService.getDeliveries, (deliveries, index) => ({
      id: index + 1,
      uuid: deliveries.uuid,
      delivery: deliveries.type,
      deleted: deliveries.isDeleted ? 'Yes' : 'No',
    }), 'deliveries');

    fetchDataFor(GenreService.getGenres, (genres, index) => ({
      id: index + 1,
      uuid: genres.uuid,
      genre: genres.type,
      deleted: genres.isDeleted ? 'Yes' : 'No',
    }), 'genres');

    fetchDataFor(UserAddressService.getUserAddress, (userAddress, index) => ({
      id: index + 1,
      uuid: userAddress.uuid,
      apartament: userAddress.apartament,
      home: userAddress.home,
      street: userAddress.street,
      postalCode: userAddress.postalCode,
      userMail: userAddress.userMail,
      deleted: userAddress.isDeleted ? 'Yes' : 'No',
    }), 'userAddress');

    fetchDataFor(ShopUserService.getShopUser, (shopUsers, index) => ({
      id: index + 1,
      uuid: shopUsers.uuid,
      userRol: shopUsers.userRol,
      name: shopUsers.name,
      surname: shopUsers.surname,
      mail: shopUsers.mail,
      birth: shopUsers.birth,
      deleted: shopUsers.isDeleted ? 'Yes' : 'No',
    }), 'users');
  }, []);

  const tableColumns = [
    // Para "Categories"
    [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'uuid', hideable: true },
      { field: 'category', headerName: 'Category', width: 130 },
      { field: 'deleted', headerName: 'Deleted', width: 90 },
    ],
    // Para "Platforms"
    [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'uuid', hideable: true },
      { field: 'platforms', headerName: 'Platform', width: 130 },
      { field: 'deleted', headerName: 'Deleted', width: 90 },
    ],
    // Para "Products"
    [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'uuid', hideable: true },
      { field: 'category', headerName: 'Category', width: 130 },
      { field: 'platform', headerName: 'Platform', width: 130 },
      { field: 'title', headerName: 'Title', width: 200 },
      { field: 'price', headerName: 'Price', width: 90 },
      { field: 'weight', headerName: 'Weight', width: 90 },
      { field: 'stock', headerName: 'Stock', width: 90 },
      { field: 'pegi', headerName: 'PEGI', width: 130 },
      { field: 'digital', headerName: 'Digital', width: 90 },
      { field: 'description', headerName: 'Description', width: 200 },
      { field: 'deleted', headerName: 'Deleted', width: 90 },
    ],
    // Para "Countries"
    [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'uuid', hideable: true },
      { field: 'country', headerName: 'Country', width: 130 },
      { field: 'deleted', headerName: 'Deleted', width: 90 },
    ],
    // Para "Cities"
    [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'uuid', hideable: true },
      { field: 'city', headerName: 'City', width: 130 },
      { field: 'country', headerName: 'Country', width: 130 },
      { field: 'deleted', headerName: 'Deleted', width: 90 },
    ],
    // Para "PostalCode"
    [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'uuid', hideable: true },
      { field: 'postalCode', headerName: 'Postal Code', width: 130 },
      { field: 'city', headerName: 'City', width: 130 },
      { field: 'country', headerName: 'Country', width: 130 },
      { field: 'deleted', headerName: 'Deleted', width: 90 },
    ],
    // Para "Payments"
    [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'uuid', hideable: true },
      { field: 'payment', headerName: 'Payments', width: 130 },
      { field: 'deleted', headerName: 'Deleted', width: 90 },
    ],
    // Para "Deliveries"
    [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'uuid', hideable: true },
      { field: 'delivery', headerName: 'Delivery', width: 130 },
      { field: 'deleted', headerName: 'Deleted', width: 90 },
    ],
    // Para "Genres"
    [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'uuid', hideable: true },
      { field: 'genre', headerName: 'Genre', width: 130 },
      { field: 'deleted', headerName: 'Deleted', width: 90 },
    ],
    // Para "Users"
    [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'uuid', hideable: true },
      { field: 'userRol', headerName: 'User Rol', width: 130 },
      { field: 'name', headerName: 'Name', width: 130 },
      { field: 'surname', headerName: 'SurName', width: 130 },
      { field: 'mail', headerName: 'Mail', width: 130 },
      { field: 'birth', headerName: 'Birth', width: 250 },
      { field: 'deleted', headerName: 'Deleted', width: 90 },
    ],
    // Para "User Address"
    [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'uuid', hideable: true },
      { field: 'apartament', headerName: 'Apartamanet', width: 130 },
      { field: 'home', headerName: 'Home', width: 130 },
      { field: 'street', headerName: 'Street', width: 130 },
      { field: 'postalCode', headerName: 'Postal Code', width: 130 },
      { field: 'userMail', headerName: 'User mail', width: 250 },
      { field: 'deleted', headerName: 'Deleted', width: 90 },
    ],
  ];

  const deleteHandlerFunctions = [
    // Función de eliminación para "Categories"
    deleteCategory,
    {/*
    // Función de eliminación para "Platforms"
    deletePlatform,
    // Función de eliminación para "Products"
    deleteProduct,
    // Función de eliminación para "Countries"
    deleteCountry,
    // Función de eliminación para "Cities"
    deleteCity,
    // Función de eliminación para "PostalCode"
    deletePostalCode,
    // Función de eliminación para "Payments"
    deletePayment,
    // Función de eliminación para "Deliveries"
    deleteDelivery,
    // Función de eliminación para "Genres"
    deleteGenre,
    // Función de eliminación para "Users"
    deleteUser,
    // Función de eliminación para "User Address"
    deleteUserAddress,
  */}
  ];

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
            <Tab label="Countries" sx={{ color: 'white', fontWeight: 'bold' }} />
            <Tab label="Cities" sx={{ color: 'white', fontWeight: 'bold' }} />
            <Tab label="PostalCode" sx={{ color: 'white', fontWeight: 'bold' }} />
            <Tab label="Payments" sx={{ color: 'white', fontWeight: 'bold' }} />
            <Tab label="Deliveries" sx={{ color: 'white', fontWeight: 'bold' }} />
            <Tab label="Genres" sx={{ color: 'white', fontWeight: 'bold' }} />
            <Tab label="Users" sx={{ color: 'white', fontWeight: 'bold' }} />
            <Tab label="Users Address" sx={{ color: 'white', fontWeight: 'bold' }} />
          </Tabs>
        </Paper>

        <div className="centered-content">
          <TableComponent
            columns={tableColumns[value]}
            data={tableData[Object.keys(tableData)[value]]}
            deleteDataBaseHandler={deleteHandlerFunctions[value]}
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default DataPage;
