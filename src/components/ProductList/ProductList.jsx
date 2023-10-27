import React from "react";
import './ProductList.css';

function ProductList({products}){
return (
		<div className='container-items'>
			{products.map(product => (
				<div className='item' key={product.uuid}>
					<figure>
						<img src="https://picsum.photos/200/300"/>
					</figure>
					<div className='info-product'>
						<h2>{product.title}</h2>
						<p className='price'>${product.price}</p>
						<button onClick={() => onAddProduct(product)}>
							Añadir al carrito
						</button>
					</div>
				</div>
			))}
		</div>
	);
}

export default ProductList;