import React from "react";
import './ProductList.css';
import ProductCard from "../Card/ProductCard";

function ProductList({products}){

	return (
		<div className='container-items'>
			{products.map(product => (
				<div className='item' key={product.uuid}>
					<ProductCard props={product}/>
				</div>
			))} 
		</div>
	);
}

export default ProductList;