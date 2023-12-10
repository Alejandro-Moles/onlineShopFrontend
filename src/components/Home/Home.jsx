
import CarouselComponent from '../Carousel/CarouselComponent'
import React, { useState, useEffect } from 'react';
import ProductService from '../../services/productService';
import ProductList from '../ProductList/ProductList';
import Title from '../Titles/Title';

function Home() {
    const [products, setProducts] = useState([]);
    const [cheapestProduct, setCheapestProduct] = useState([])

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await ProductService.getTopAvaliableProducts();
          setProducts(response.data); 
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
      const fetchCheapestProducts = async () => {
        try {
          const response = await ProductService.getCheapestProducts();
          setCheapestProduct(response.data); 
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
      fetchProducts();
      fetchCheapestProducts();
    }, []);

    return (
        <div className="App"> 
            <Title title={"Cheapest Products"}/>
            <CarouselComponent  slides={cheapestProduct}/>
            <Title title={"Top Sale"}/>
            <ProductList products={products}/>
        </div>
    );
  };
  
  export default Home;