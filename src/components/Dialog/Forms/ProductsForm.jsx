import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputAdornment,
  TextField
} from '@mui/material';
import { fetchCategories, fetchPlatforms } from '../../loadData'
import CustomSelect from '../CustomSelect';

function ProductForm({ formData, handleChange, columns }) {
  const [categories, setCategories] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [formErrors, setFormErrors] = useState({});

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
  
  useEffect(() => {
    const fetchInitialData = async () => {
      const fetchedCategories = await fetchCategories();
      const fetchedPlatforms = await fetchPlatforms();
      setCategories(fetchedCategories);
      setPlatforms(fetchedPlatforms);
    };

    fetchInitialData();
  }, []);

  const handleImageChange = (e) => {
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
  
  const renderCustomSelect = (column, options) => {
      return (
        <CustomSelect
          label={column.headerName + " *"}
          value={formData[column.field] || ''}
          onChange={(e) => handleChange(column.field, e.target.value, column.field)}
          options={options.map((option) => ({
            value: option.type,
            label: option.type,
          }))}
          error={formErrors[column.field]}
          helperText={formErrors[column.field]}
        />
      );
  };

  const handleNumberChange = (field, value) => {
    const newValue = parseFloat(value);

    if (!isNaN(newValue) && newValue > 0) {
      handleChange(field, newValue, field);
    }
  };

  
  return (
    <DialogContent>
      <FormControl component="fieldset">
      {columns.map((column) => (
            <div key={column.field} className="AddDataform-field">
              {isImageColumn(column.field) ? (
                <div className="image-selector">
                  {/* Aquí se coloca el selector de imagen */}
                </div>
              ) : isNumberColumn(column.field) ? (
                <div>
                  <TextField 
                    fullWidth
                    label={column.headerName + " *"}
                    type="number"
                    className="AddDatatext-field"
                    value={formData[column.field] || ''}
                    onChange={(e) => handleNumberChange(column.field, e.target.value)}
                    error={Boolean(formErrors[column.field])}
                    helperText={formErrors[column.field]}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">{getColumnAdornment(column.field)}</InputAdornment>,
                    }}
                  />
                </div>
              ) : (column.field === 'category' || column.field === 'platform') ? (
                <div>
                  {column.field === 'category' ? renderCustomSelect(column, categories) : renderCustomSelect(column, platforms)}
                </div>
              ) : (column.field === 'pegi') ? (
                <div>
                  <CustomSelect
                    label={column.headerName + " *"}
                    value={formData[column.field] || ''}
                    onChange={(e) => handleChange(column.field, e.target.value, column.field)}
                    options={pegiOptions}
                    error={formErrors[column.field]}
                    helperText={formErrors[column.field]}
                  />
                </div>
              ) : (column.field === 'digital') ? (
                <div>
                  <CustomSelect
                    label={column.headerName + " *"}
                    value={formData[column.field] || ''}
                    onChange={(e) => handleChange(column.field, e.target.value, column.field)}
                    options={digitalOptions}
                    error={formErrors[column.field]}
                    helperText={formErrors[column.field]}
                  />
                </div>
              ) : (
                <TextField
                  fullWidth
                  label={column.headerName + " *"}
                  className="AddDatatext-field"
                  value={formData[column.field] || ''}
                  onChange={(e) => handleChange(column.field, e.target.value, column.field)}
                />
              )}
            </div>
          ))}
      </FormControl>
    </DialogContent>
  );
}

export default ProductForm;
