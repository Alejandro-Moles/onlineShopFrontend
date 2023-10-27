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
    onFilterChange(selectedCategory, selectedPlatform);
  }, [selectedCategory, selectedPlatform]);

  const handleSelectChangeCategory = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
  };

  const handleSelectChangePlatform = (event) => {
    const selectedValue = event.target.value;
    setSelectedPlatform(selectedValue);
  };

  return (
    <div className="filterList">
      <div className="select-container">
        <label className="select-label">Category</label>
        <select className="select" onChange={handleSelectChangeCategory}>
          <option value="">Select a Category</option>
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
    </div>
  );
};
