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
  const [selectedPegi, setSelectedPEGI] = useState('');
  const [results, setResults] = useState([]);
  const [filterListVisible, setFilterListVisible] = useState(false);

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

  const toggleFilterList = () => {
    setFilterListVisible(!filterListVisible);
  };

  const handleFilterChange = (category, platform, maxPrice, pegi) => {
    setSelectedCategory(category);
    setSelectedPlatform(platform);
    setSelectedPEGI(pegi);

    const filteredResults = items.filter((item) => {
      
      const categoryMatch = category ? item.category === category : true;
      const platformMatch = platform ? item.platform === platform : true;
      const pegiMatch = pegi ? item.pegi == pegi : true;
      const priceMatch = maxPrice ? item.price <= maxPrice : true;

      return categoryMatch && platformMatch && priceMatch && pegiMatch;
    });

    setResults(filteredResults);
  };

  return (
    <div>
      <div className="searchBar-container">
        <SearchBar setResults={setResults} toggleFilterList={toggleFilterList}/>
      </div>
      {filterListVisible && <FilterList onFilterChange={handleFilterChange} />}
      <ProductList products={results} />
    </div>
  );
}

export default SearchPage;