// FilterList.js
import React, { useState, useEffect } from 'react';
import CategoriesService from '../../services/categoriesService';
import PlatformsService from '../../services/platformsService';
import './FilterList.css';

export const FilterList = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedPegi, setSelectedPEGI] = useState("");

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

  const handleSelectChangeCategory = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
    onFilterChange(selectedValue, selectedPlatform, maxPrice, selectedPegi);
  };

  const handleSelectChangePlatform = (event) => {
    const selectedValue = event.target.value;
    setSelectedPlatform(selectedValue);
    onFilterChange(selectedCategory, selectedValue, maxPrice, selectedPegi);
  };

  const handleMaxPriceChange = (event) => {
    const price = event.target.value;
    setMaxPrice(price);
    onFilterChange(selectedCategory, selectedPlatform, price, selectedPegi);
  };

  const handleSelectChangePEGI = (event) => {
    const selectedValue = event.target.value;
    setSelectedPEGI(selectedValue);
    onFilterChange(selectedCategory, selectedPlatform, maxPrice, selectedValue);
  };

  return (
    <div className="filterList">
      <div className="select-container">
        <label className="select-label">Category</label>
        <select className="select" onChange={handleSelectChangeCategory}>
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category.uuid} value={category.type}>
              {category.type}
            </option>
          ))}
        </select>
      </div>

      <div className="select-container">
        <label className="select-label">Platform</label>
        <select className="select" onChange={handleSelectChangePlatform}>
          <option value="">Select a Platform</option>
          {platforms.map((platform) => (
            <option key={platform.uuid} value={platform.type}>
              {platform.type}
            </option>
          ))}
        </select>
      </div>

      <div className="select-container">
        <label className="select-label">PEGI</label>
        <select className="select" onChange={handleSelectChangePEGI}>
          <option value="">All</option>
          <option value="3">PEGI 3</option>
          <option value="7">PEGI 7</option>
          <option value="12">PEGI 12</option>
          <option value="16">PEGI 16</option>
          <option value="18">PEGI 18</option>
        </select>
      </div>

      <div className="price-filter-container">
        <label className="select-label">Max Price</label>
        <input
          type="number"
          className="select"
          value={maxPrice}
          onChange={handleMaxPriceChange}
        />
      </div>
      
    </div>
  );
};