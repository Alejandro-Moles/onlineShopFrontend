import React from 'react';
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
function ProductCard({ props, onAddToCart }) {
  return (
    <div className='product-card'>
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
              <IconButton aria-label="add to favorites" className='iconCard' style={{ color: 'red' }}>
                <ShoppingCartIcon />
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
