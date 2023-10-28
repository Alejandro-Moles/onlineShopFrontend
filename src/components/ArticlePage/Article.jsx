import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import ProductService from '../../services/productService';
import './Article.css';

function Article() {
  const { uuid } = useParams();
  const [product, setProduct] = useState("");

  useEffect(() => {
    loadProduct();
  }, [uuid]);

  const loadProduct = async () => {
    try {
      const result = await ProductService.getProduct(uuid);
      setProduct(result.data);
    } catch (error) {
      console.error('Error fetching product: ', error);
    }
  }

  console.log(product);

  return (
    <div className="Article">
      <div className='details'>
        <div className='big-img'>
          <img src="https://picsum.photos/200/300" alt="Product" />
        </div>

        <div className='box'>
          <div className='title-price'>
            <h2>{product.title}</h2>
            <span className='price'>${product.price}</span>
          </div>

          <div className='info'>
            <p><span className='infoSpan'>PEGI: </span>{product.pegi}</p>
            <p><span className='infoSpan'>Category: </span>{product.category}</p>
            <p><span className='infoSpan'>Platform: </span>{product.platform}</p>
          </div>

          <p className='description'>{product.description}</p>
          
          <div className="button-container">
            <button className='cart'>Add to cart</button>
          </div>
        </div>
      </div>
    </div>

  )
}


export default Article;
