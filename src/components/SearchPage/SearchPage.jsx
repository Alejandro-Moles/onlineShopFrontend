import React, { useState, useEffect } from 'react';
import './css/SearchPage.css';
import SearchBar from './SearchBar';
import ProductList from '../ProductList/ProductList';
import ProductService from '../../services/productService';
import FilterMenu from './FilterMenu';

function SearchPage() {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedPegi, setSelectedPEGI] = useState('');
  const [results, setResults] = useState([]);
  const [filterListVisible, setFilterListVisible] = useState(false);
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);

  useEffect(() => { 
    const fetchItems = async () => {
      try {
        const response = await ProductService.getAvaliableProducts();
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

  const handleFilterChange = (category, platform, maxPrice, pegi, genres) => {
    setSelectedCategory(category);
    setSelectedPlatform(platform);
    setSelectedPEGI(pegi);

    const filteredResults = items.filter((item) => {
      const categoryMatch = category ? item.category === category : true;
      const platformMatch = platform ? item.platform === platform : true;
      const pegiMatch = pegi ? item.pegi == pegi : true;
      const priceMatch = maxPrice ? item.price <= maxPrice : true;
      const genreMatch = genres ? genres.some(genre => item.genres.includes(genre)) : true;
      return categoryMatch && platformMatch && priceMatch && pegiMatch && genreMatch;
    });

    setResults(filteredResults);
  };

  const toggleFilterMenu = () => {
    setFilterMenuVisible(!filterMenuVisible);

    if (filterMenuVisible) {
      document.body.classList.remove('menu-opened');
    } else {
      document.body.classList.add('menu-opened');
    }
  };

  return (
    <div className={`searchPage-container ${filterMenuVisible ? 'menu-opened' : ''}`}>
      <div className="searchBar-container">
        <SearchBar setResults={setResults} toggleFilterList={toggleFilterMenu} />
      </div>
      {filterMenuVisible && <FilterMenu onFilterChange={handleFilterChange} />}
      <div className='ProductList'>
        <ProductList products={results} />
      </div>
    </div>
  );
}

export default SearchPage;