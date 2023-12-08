// FilterList.js
import React, { useState, useEffect } from 'react';
import './css/FilterList.css';
import { fetchAvailableCategories, fetchAvailablePlatforms, fetchAvailableGenres } from '../../scripts/loadData';
import { Checkbox, List, ListItem, ListItemText, FormControlLabel, Paper  } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../scripts/Theme'; 



export const FilterList = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedPegi, setSelectedPEGI] = useState("");
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);


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
    const nonNegativePrice = Math.max(0, parseFloat(price));
    setMaxPrice(nonNegativePrice);
    onFilterChange(selectedCategory, selectedPlatform, nonNegativePrice, selectedPegi);
  };

  const handleSelectChangePEGI = (event) => {
    const selectedValue = event.target.value;
    setSelectedPEGI(selectedValue);
    onFilterChange(selectedCategory, selectedPlatform, maxPrice, selectedValue);
  };

  const handleCheckboxChange = (genre) => {
    const updatedGenres = selectedGenres.includes(genre) 
      ? selectedGenres.filter(selectedGenre => selectedGenre !== genre)
      : [...selectedGenres, genre];

    setSelectedGenres(updatedGenres);
    const selectGenre = updatedGenres.map(selectedGenre => selectedGenre.type);
    onFilterChange(selectedCategory, selectedPlatform, maxPrice, selectedPegi, selectGenre);
  };

  return (
    <ThemeProvider theme={theme}>
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
            <option value="">All</option>
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

        <div className="select-container">
          <label className="select-label">Max Price</label>
          <input
            type="number"
            className="select"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            min="0"
          />
        </div>

        <div className="select-container">
          <label className="select-label">Genres</label>
          <Paper className="genres-container" elevation={3}>
            <List>
              {genres.map((genre) => (
                  <ListItem key={genre.uuid}>
                    <FormControlLabel
                      control={<Checkbox checked={selectedGenres.includes(genre)} onChange={() => handleCheckboxChange(genre)} />}
                      label={<ListItemText primary={genre.type} />}
                  />
                  </ListItem>
              ))}
            </List>   
          </Paper>
        </div>

      </div>
    </ThemeProvider>
  );
};