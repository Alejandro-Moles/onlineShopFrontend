import React, { useState, useEffect } from 'react';
import {
  DialogContent,
  TextField,
  FormControl,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle ,
  DialogActions, 
  List, 
  ListItem, 
  ListItemText, 
  Checkbox,
  Input 
} from '@mui/material';
import { fetchAvailableCategories, fetchAvailablePlatforms, fetchAvailableGenres } from '../../../scripts/loadData';
import CustomSelect from '../CustomSelect';
import "../css/AddDataDialog.css";

function ProductForm({ formData, handleChange, updateData }) {
  const [categories, setCategories] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [genres, setGenres] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState(
    updateData && updateData[0] && updateData[0].genres
      ? updateData[0].genres.split(',').map(genre => genre.trim())
      : []
  );
  
  const [imageFileNames, setImageFileNames] = useState([]);


  useEffect(() => {
    const fetchInitialData = async () => {
      const fetchedCategories = await fetchAvailableCategories();
      const fetchedPlatforms = await fetchAvailablePlatforms();
      const fetchedGenres = await fetchAvailableGenres();
      setCategories(fetchedCategories);
      setPlatforms(fetchedPlatforms);
      setGenres(fetchedGenres);
    };

    fetchInitialData();
  }, []);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleGenreSelection = (genre) => {
    setSelectedGenres((prevGenres) => {
      const isSelected = prevGenres.includes(genre);
      if (isSelected) {
        return prevGenres.filter((g) => g !== genre);
      } else {
        return [...prevGenres, genre];
      }
    });
  };

  const handleAcceptGenres = () => {
    handleChange("genres", selectedGenres, "genres");
    setDialogOpen(false);
  };

  const [platformValue, setPlatformValue] = useState(updateData ? updateData[0].platform : formData.platform || "");
  const [categoryValue, setCategoryValue] = useState(updateData ? updateData[0].category : formData.category || "");
  const [titleValue, setTitleValue] = useState(updateData ? updateData[0].productTitle : formData.productTitle || "");
  const [priceValue, setPriceValue] = useState(updateData ? updateData[0].price : formData.price || "");
  const [stockValue, setStockValue] = useState(updateData ? updateData[0].stock : formData.stock || "");
  const [pegiValue, setPegiValue] = useState(updateData ? updateData[0].pegi : formData.pegi || "");
  const [digitalValue, setDigitalValue] = useState(updateData ? updateData[0].digital : formData.digital || "");
  const [descriptionValue, setDescriptionValue] = useState(updateData ? updateData[0].description : formData.description || "");


  const handleProductChange = (e, field) => {
    const newValue =  e.target.value;
    const numberValue = parseFloat(newValue);
    console.log(newValue)
    console.log(field)
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

  const getColumnAdornment = (columnName) => {
    if (columnName === 'price') {
      return '$';
    } else if (columnName === 'weight') {
      return 'kg';
    }
    return '';
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

  const renderImageField = () => {
    return (
      <div className="AddDataform-field">
        <input
          accept="image/*"
          id="contained-button-file"
          type="file"
          multiple
          style={{ display: 'none', width: '100%' }}
          onChange={handleImageChange}
        />
        <label htmlFor="contained-button-file">
          <Button variant="outlined" color="primary" component="span" fullWidth>
            Seleccionar Imágenes
          </Button>
        </label>
      </div>
    );
  };

  const handleImageChange = async (e) => {
    try {
      const files = e.target.files;
  
      const readFilesPromises = Array.from(files).map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.onerror = (error) => {
            reject(error);
          };
          reader.readAsDataURL(file);
        });
      });
  
      const base64Results = await Promise.all(readFilesPromises);
      const fileNames = Array.from(files).map((file) => file.name);
      setImageFileNames(fileNames);
      handleChange("image", base64Results, "image");
    } catch (error) {
      console.error("Error al manejar las imágenes:", error);
    }
  };


  return (
    <DialogContent>
      <FormControl component="fieldset">
        <div className="AddDataform-field">
          <div className="AddDataform-field">{renderSelectExternalData('category', categories, "Category", categoryValue)}</div>
          <div className="AddDataform-field">{renderSelectExternalData('platform', platforms, "Platform", platformValue)}</div>
          <div className="AddDataform-field">{renderTextField('Title', 'productTitle', titleValue)}</div>
          <div className="AddDataform-field">{renderNumberField('Price', 'price', priceValue)}</div>
          <div className="AddDataform-field">{renderNumberField('Stock', 'stock', stockValue)}</div>
          <div className="AddDataform-field">{renderSelectLocalData('pegi', pegiOptions, 'PEGI', pegiValue)}</div>
          <div className="AddDataform-field">{renderSelectLocalData('digital', digitalOptions, 'Digital', digitalValue)}</div>
          <div>{renderTextField('Description', 'description', descriptionValue)}</div>
          <Button className="AddDataform-field" variant="outlined" color="primary" onClick={handleDialogOpen} fullWidth>
            Seleccionar Géneros
          </Button>
          <div className="AddDataform-field">
            {renderImageField()}
            <div className="SelectedImagesFeedback">
              {imageFileNames.map((fileName, index) => (
                <div key={index}>{fileName}</div>
              ))}
            </div>
          </div>
        </div>
      </FormControl>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Seleccionar Géneros</DialogTitle>
        <DialogContent>
          <List>
            {genres.map((genre) => (
            <ListItem key={genre.uuid}>
              <Checkbox
                edge="start"
                tabIndex={-1}
                disableRipple
                color="primary"
                checked={selectedGenres.includes(genre.type)}
                onChange={() => handleGenreSelection(genre.type)}
                key={genre.uuid}
              />
              <ListItemText primary={genre.type} />
            </ListItem>
          ))}
        </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAcceptGenres} color="primary">
            Aceptar
          </Button>
          <Button onClick={handleDialogClose} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </DialogContent>
  );
}

export default ProductForm;
