import React, { useState, useEffect } from 'react';
import './SearchPage.css';
import SearchBar from './SearchBar';
import ProductList from '../ProductList/ProductList';
import { FilterList } from './FilterList';
import ProductService from '../../services/productService';

function SearchPage() {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await ProductService.getProducts();
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchItems();
  }, []);

  const handleFilterChange = (category, platform) => {
    setSelectedCategory(category);
    setSelectedPlatform(platform);

    const filteredResults = items.filter((item) => {
      if (category && platform) {
        return item.category === category && item.platform === platform;
      } else if (category) {
        return item.category === category;
      } else if (platform) {
        return item.platform === platform;
      }
      return true;
    });

    setResults(filteredResults);
  };

  return (
    <div>
      <div className="searchBar-container">
        <SearchBar setResults={setResults} />
      </div>
      <FilterList onFilterChange={handleFilterChange} />
      <ProductList products={results} />
    </div>
  );
}

export default SearchPage;
