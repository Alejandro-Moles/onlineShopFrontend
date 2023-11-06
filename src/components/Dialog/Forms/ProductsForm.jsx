import React, { useState, useEffect } from 'react';
import {
  DialogContent,
  TextField,
  FormControl,
  InputAdornment,
} from '@mui/material';
import { fetchCategories, fetchPlatforms } from '../../loadData';
import CustomSelect from '../CustomSelect';
import "../AddDataDialog.css";


function ProductForm({ formData, handleChange, updateData }) {
  const [categories, setCategories] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchInitialData = async () => {
      const fetchedCategories = await fetchCategories();
      const fetchedPlatforms = await fetchPlatforms();
      setCategories(fetchedCategories);
      setPlatforms(fetchedPlatforms);
    };

    fetchInitialData();
  }, []);

  const [platformValue, setPlatformValue] = useState(updateData ? updateData[0].platform : formData.platform || "");
  const [categoryValue, setCategoryValue] = useState(updateData ? updateData[0].category : formData.category || "");
  const [titleValue, setTitleValue] = useState(updateData ? updateData[0].productTitle : formData.productTitle || "");
  const [priceValue, setPriceValue] = useState(updateData ? updateData[0].price : formData.price || "");
  const [weightValue, setWeightValue] = useState(updateData ? updateData[0].weight : formData.weight || "");
  const [stockValue, setStockValue] = useState(updateData ? updateData[0].stock : formData.stock || "");
  const [pegiValue, setPegiValue] = useState(updateData ? updateData[0].pegi : formData.pegi || "");
  const [digitalValue, setDigitalValue] = useState(updateData ? updateData[0].digital : formData.digital || "");
  const [descriptionValue, setDescriptionValue] = useState(updateData ? updateData[0].description : formData.description || "");

  const handleProductChange = (e, field) => {
    const newValue =  e.target.value;
    const numberValue = parseFloat(newValue);
    switch (field){
      case "platform":
        setPlatformValue(newValue);
        handleChange(field, newValue, field);
        break;
      case "category":
        setCategoryValue(newValue);
        handleChange(field, newValue, field);
        break;
      case "productTitle":
        setTitleValue(newValue);
        handleChange(field, newValue, field);
        break;
      case "price":
        if (!isNaN(numberValue) && numberValue > 0) {
          setPriceValue(newValue);
          handleChange(field, newValue, field);
        }
        break;
      case "weight":
        if (!isNaN(numberValue) && numberValue > 0) {
          setWeightValue(newValue);
          handleChange(field, newValue, field);
        }
        break;
      case "stock":
        if (!isNaN(numberValue) && numberValue > 0) {
          setStockValue(newValue);
          handleChange(field, newValue, field);
        }
        break;
      case "pegi":
        setPegiValue(newValue);
        handleChange(field, newValue, field);
        break;
      case "digital":
        setDigitalValue(newValue);
        handleChange(field, newValue, field);
        break;
      case "description":
        setDescriptionValue(newValue);
        handleChange(field, newValue, field);
        break;
    }
  };

  const pegiOptions = [
    { label: 'PEGI 3', value: 3 },
    { label: 'PEGI 7', value: 7 },
    { label: 'PEGI 12', value: 12 },
    { label: 'PEGI 16', value: 16 },
    { label: 'PEGI 18', value: 18 },
  ];

  const digitalOptions = [
    { label: 'Digital', value: "digital" },
    { label: 'Physical', value: "physical" },
  ];

  const handleImageChange = (e) => {
    // Implementar la lógica de selección de imagen si es necesario
  };

  const isNumberColumn = (columnName) => {
    return columnName === 'price' || columnName === 'weight' || columnName === 'stock';
  };

  const getColumnAdornment = (columnName) => {
    if (columnName === 'price') {
      return '$';
    } else if (columnName === 'weight') {
      return 'kg';
    }
    return '';
  };

  const isImageColumn = (columnName) => {
    return columnName === 'image';
  };

  const renderSelectExternalData = (field, options, headerName, inicialData) => {
    return (
      options.length > 0 ? (
        <CustomSelect
          label={headerName + " *"}
          value={inicialData}
          onChange={(e) => handleProductChange(e, field)}
          options={options.map((option) => ({
            value: option.type,
            label: option.type,
          }))}
          error={formErrors[field]}
          helperText={formErrors[field]}
        />
      ) : null
    );
  };

  const renderNumberField = (headerName, field, inicialData) => {
    return(
      <TextField 
        fullWidth
        label={headerName + " *"}
        type="number"
        className="AddDatatext-field"
        value={inicialData}
        onChange={(e) => handleProductChange(e, field)}
        error={Boolean(formErrors[field])}
        helperText={formErrors[field]}
        InputProps={{
          startAdornment: <InputAdornment position="start">{getColumnAdornment(field)}</InputAdornment>,
        }}
        />
    );
  }

  const renderSelectLocalData = (field, options, headerName, inicialData) => {
    inicialData = (inicialData === 'Yes') ? 'digital' : (inicialData === 'No') ? 'physical' : inicialData;
    return (
      options.length > 0 ? (
        <CustomSelect
          label={headerName + " *"}
          value={inicialData}
          onChange={(e) => handleProductChange(e, field)}
          options={options}
          error={formErrors[field]}
          helperText={formErrors[field]}
        />
      ) : null
    );
  };

  const renderTextField = (headerName, field, inicialData) => {
    return(
      <TextField
            fullWidth
            label={headerName + " *"}
            className="AddDatatext-field"
            value={inicialData}
            onChange={(e) => handleProductChange(e, field)}
        />
    );
  }

  return (
    <DialogContent>
      <FormControl component="fieldset">
        <div className="AddDataform-field">
          <div className="AddDataform-field">{renderSelectExternalData('category', categories, "Category", categoryValue)}</div>
          <div className="AddDataform-field">{renderSelectExternalData('platform', platforms, "Platform", platformValue)}</div>
          <div className="AddDataform-field">{renderTextField('Title', 'productTitle', titleValue)}</div>
          <div className="AddDataform-field">{renderNumberField('Price', 'price', priceValue)}</div>
          <div className="AddDataform-field">{renderNumberField('Weight', 'weight', weightValue)}</div>
          <div className="AddDataform-field">{renderNumberField('Stock', 'stock', stockValue)}</div>
          <div className="AddDataform-field">{renderSelectLocalData('pegi', pegiOptions, 'PEGI', pegiValue)}</div>
          <div className="AddDataform-field">{renderSelectLocalData('digital', digitalOptions, 'Digital', digitalValue)}</div>
          <div>{renderTextField('Description', 'description', descriptionValue)}</div>
        </div>
      </FormControl>
    </DialogContent>
  );
}

export default ProductForm;
