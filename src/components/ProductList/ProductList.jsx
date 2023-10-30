import React from "react";
import './ProductList.css';
import ProductCard from "../Card/ProductCard";

function ProductList({products}){

	const handleAddToCart = () => {
		// Lógica para agregar al carrito
	  };
	

	return (
		<div className='container-items'>
			{products.map(product => (
				<div className='item' key={product.uuid}>
					<ProductCard props={product} onAddToCart={handleAddToCart}/>
				</div>
			))} 
		</div>
	);
}

export default ProductList;