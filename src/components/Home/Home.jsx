
import CarouselComponent from '../Carousel/CarouselComponent'
import React, { useState, useEffect } from 'react';
import ProductService from '../../services/productService';
import ProductList from '../ProductList/ProductList';
import Title from '../Titles/Title';

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await ProductService.getTopAvaliableProducts();
          setProducts(response.data); 
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
      fetchProducts();
    }, []);

    return (
        <div className="App"> 
            <CarouselComponent  slides={products}/>
            <Title></Title>
            <ProductList products={products}/>
        </div>
    );
  };
  
  export default Home;