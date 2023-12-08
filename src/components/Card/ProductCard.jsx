import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  IconButton,
  Tooltip,
  Button,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import CustomAlert from '../AlertsMessage/CustomAlert';
import { OutOfStockError } from '../../scripts/Errors/error';
import CartLogic from '../../scripts/CartLogic';
import './ProductCard.css';

function ProductCard({ props }) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');
 
  const addToCart = async () => {
    try {
      await CartLogic.addToCart(props.uuid);
      showAlert('Product added to cart', 'success');
      CartLogic.addToCartCount();
    } catch (error) {
      if (error instanceof OutOfStockError) {
        showAlert('Product out of stock. Cannot add to cart.', 'warning');
      } else {
        showAlert('Failed to add product to cart.', 'error');
      }
    }
  };

  const showAlert = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setIsAlertOpen(true);
  };

  return (
    <div className="product-card">
      <CustomAlert
        message={alertMessage}
        severity={alertSeverity}
        open={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        autoHideDuration={2000}
      />

      <Card className="custom-card">
        <CardMedia
          className="imgItem"
          component="img"
          alt={props.title}
          height="140"
          image="https://picsum.photos/200/300"
        />

        <div className='customCard'>
          <CardContent>
            <div className='cardTitle'>
              <Typography gutterBottom variant="h4" component="div" className='titleText'>
                {props.title}
              </Typography>
              <Typography variant="h5" className='priceText'>
                  ${props.price}
              </Typography>
            </div>
            <Typography variant="body2" className='contentText'>
              {props.genres && props.genres.length > 0
                ? props.genres.join(', ') 
                : 'No genres available'}
            </Typography>
            <Typography variant="body2" className='contentText2'>
              {props.platform}, {props.isDigital ? 'Digital' : 'Physical'}
            </Typography>
          </CardContent>

          <div className="card-actions">
          <CardActions sx={{ justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="small"
                onClick={addToCart}
                style={{
                  marginRight: '12px',
                  backgroundColor: '#EC6B22',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'white',
                    color: '#EC6B22',
                    borderColor: 'green',
                  },
                }}
              >
                Add to Cart
              </Button>

              <Link to={`/article/${props.uuid}`}>
                <Button
                  variant="contained"
                  size="small"
                  style={{
                    marginLeft: '12px',
                    backgroundColor: '#EC6B22',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'white',
                      color: '#EC6B22',
                      borderColor: 'green',
                    },
                  }}
                >
                  View Details
                </Button>
              </Link>
            </CardActions>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ProductCard;
