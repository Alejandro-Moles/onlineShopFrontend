import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import ProductService from '../../services/productService';
import './Article.css';
import CartLogic from '../../scripts/CartLogic';
import CustomAlert from '../AlertsMessage/CustomAlert';
import { OutOfStockError } from '../../scripts/Errors/error'

function Article() {
  const { uuid } = useParams();
  const [product, setProduct] = useState("");

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');


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

  const addToCart = async () => {
    try {
      await CartLogic.addToCart(uuid);
      showAlert("Product added to cart", "success");
      CartLogic.addToCartCount();
    } catch (error) {
      if (error instanceof OutOfStockError) {
        showAlert("Product out of stock. Cannot add to cart.", "warning");
      } else {
        showAlert("Failed to add product to cart.", "error");
      }
    }
  };

  const showAlert = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setIsAlertOpen(true);
  };

  return (
    <div className="Article">
      <CustomAlert
        message={alertMessage}
        severity={alertSeverity}
        open={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        autoHideDuration={2000}
      />
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
            <p><span className='infoSpan'>Format: </span>{product.isDigital ? 'Digital' : 'Physical'}</p>
            <p><span className='infoSpan'>Genres: </span>{product.genres && product.genres.length > 0
                  ? product.genres.join(', ') 
                  : 'No genres available'}</p>
          </div>

          <p className='description'>{product.description}</p>
          
          <div className="button-container">
            <button className='cart' onClick={addToCart}>Add to cart</button>
          </div>
        </div>
      </div>
    </div>

  )
}


export default Article;
