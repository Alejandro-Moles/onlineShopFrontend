import React, { useState, useEffect } from 'react';
import './AddProduct.css';
import CategoriesService from '../../services/categoriesService';
import PlatformsService from '../../services/platformsService';
import AlertMessage from '../AlertsMessage/AlertMessage';

const ProductForm = () => {
  const [productData, setProductData] = useState({
    category: '',
    platform: '',
    title: '',
    price: '',
    weight: '',
    stock: '',
    digital: false,
    description: '',
    image: null,
  });

  const [categories, setCategories] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);

  const [alertOpen, setAlertOpen] = useState(false);
  const [message, setMessage] = useState('Default message');
  const [severity, setSeverity] = useState('info');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CategoriesService.getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const response = await PlatformsService.getPlatforms();
        setPlatforms(response.data);
      } catch (error) {
        console.error('Error fetching platforms:', error);
      }
    };
    fetchPlatforms();
  }, []);

  useEffect(() => {
    const {
      category,
      platform,
      title,
      price,
      weight,
      stock,
      description,
    } = productData;

    const isValid =
      category && platform && title && price && weight && stock && description;

    setIsFormValid(isValid);
  }, [productData]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const newValue = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;

    setProductData({
      ...productData,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log(productData);
    } else {
      setMessage("AAA");
      setSeverity("error");
      setAlertOpen(true);
    }
  };


  return (
    <div className="form-container">

      <div>
        <AlertMessage
          message={message}
          severity={severity}
          open={alertOpen}
          onClose={() => setAlertOpen(false)}
        />
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label className="labelForm">Categoría:</label>
          <select name="category" className="text-input" value={productData.category} onChange={handleChange}>
            <option value="">Seleccionar categoría</option>
            {categories.map((category) => (
              <option key={category.uuid} value={category.type}>
                {category.type}
              </option>
            ))}
          </select>
        </div>
        <div className="input-container">
          <label className="labelForm">Plataforma:</label>
          <select name="platform" className="text-input" value={productData.platform} onChange={handleChange}>
            <option value="">Seleccionar plataforma</option>
            {platforms.map((platform) => (
              <option key={platform.uuid} value={platform.type}>
                {platform.type}
              </option>
            ))}
          </select>
        </div>
        <div className="input-container">
          <label className="labelForm">Título:</label>
          <input type="text" name="title" className="text-input" value={productData.title} onChange={handleChange} />
        </div>
        <div className="input-container">
          <label className="labelForm">Precio:</label>
          <input type="number" name="price" className="number-input" value={productData.price} onChange={handleChange} />
        </div>
        <div className="input-container">
          <label className="labelForm">Peso:</label>
          <input type="number" name="weight" className="number-input" value={productData.weight} onChange={handleChange} />
        </div>
        <div className="input-container">
          <label className="labelForm">Stock:</label>
          <input type="number" name="stock" className="number-input" value={productData.stock} onChange={handleChange} />
        </div>
        <div className="input-container">
          <label className="labelForm">Es digital:</label>
          <input type="checkbox" name="digital" className="checkbox-input" checked={productData.digital} onChange={handleChange} />
        </div>
        <div className="input-container">
          <label className="labelForm">Descripción:</label>
          <textarea name="description" className="text-input" value={productData.description} onChange={handleChange} />
        </div>
        <div className="input-container">
          <label className="labelForm">Imagen:</label>
          <input type="file" name="image" className="file-input" accept="image/*" onChange={handleChange} />
        </div>
        <button type="submit" className="submit-button">
          Guardar Producto
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
