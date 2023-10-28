import React from "react";
import './ProductList.css';
import { Link } from "react-router-dom";

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
						
						<div className="buttonContainer">
							<button className="buttonInfo" onClick={() => onAddProduct(product)}>
								Add to Cart
							</button>
							<Link to={`/article/${product.uuid}`}>
								<button  >
									View Details
								</button>	
							</Link>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default ProductList;