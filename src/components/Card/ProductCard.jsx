import React, { useState, useRef } from "react";
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia, 
  Typography,
  CardActions,
  IconButton,
  Tooltip,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import "./ProductCard.css";
import CartLogic from '../../scripts/CartLogic';
import CustomAlert from '../AlertsMessage/CustomAlert';
import { OutOfStockError } from '../../scripts/Errors/error'


function ProductCard({ props}) {

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');

  const addToCart = async () => {
    try {
      await CartLogic.addToCart(props.uuid);
      showAlert("Product added to cart", "success");
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
    <div className='product-card'>

      <CustomAlert
        message={alertMessage}
        severity={alertSeverity}
        open={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        autoHideDuration={2000}
      />

      <Card className='custom-card' sx={{ backgroundColor: 'orange', color: 'white' }}>
        <figure className='cartItem'>
          <CardMedia
            className='imgItem'
            component="img"
            alt={props.title}
            height="140"
            image="https://picsum.photos/200/300"
          />
        </figure>

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="h6" color="text.primary">
            Price: ${props.price}
          </Typography>
        </CardContent>

        <div className='card-actions'>
          <CardActions>
            <Tooltip title="Add to Cart" arrow>
              <IconButton aria-label="add to favorites" className='iconCard' style={{ color: 'red' }} onClick={addToCart}>
                <ShoppingCartIcon/>
              </IconButton>
            </Tooltip>
            
            <Link to={`/article/${props.uuid}`}>
                <Tooltip title="More Details" arrow>
                <IconButton aria-label="share" style={{ color: 'red' }}>
                    <InfoIcon />
                </IconButton>
                </Tooltip>
            </Link>
          </CardActions>
        </div>
      </Card>
    </div>
  );
}

export default ProductCard;
