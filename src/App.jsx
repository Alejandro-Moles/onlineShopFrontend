
import './App.css'
import NavBar from './components/NavBar';
import ProductService from './services/productService';
import React, { useState, useEffect } from 'react';

function App() {

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductService.getProducts();
        setProducts(response.data); 
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return <div className="App">
      <NavBar></NavBar>
      <h1>Hola</h1>
  </div>;
}

export default App
