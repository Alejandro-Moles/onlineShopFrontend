import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OrderService from '../../services/orderService';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  IconButton
} from '@mui/material';
import { FixedSizeList } from 'react-window';
import InfoIcon from '@mui/icons-material/Info';
import OrderDetailsDialog from '../Dialog/OrderDetailsDialog';
import "./css/ViewOrder.css"

const ViewOrder = () => {
  const { uuid } = useParams();
  const [orders, setOrders] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectOrder, setSelectOrder] = useState([]);

  useEffect(() => {
    loadOrders();
  }, [uuid]);

  const loadOrders = async () => {
    try {
      const result = await OrderService.getAllOrderforUser(uuid);
      setOrders(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderRow = ({ index, style }) => {
    const order = orders[index];
  
    return (
      <ListItem key={order.uuid} style={style} className='ListItem'>
        <ListItemText
          primary={
            <Typography variant="subtitle1" style={{ marginBottom: '8px', fontWeight: 'bold' }}>
              {`UUID`}
            </Typography>
          }
          secondary={`${order.uuid}`}
        />
        <ListItemText
          primary={
            <Typography variant="subtitle1" style={{ marginBottom: '8px', fontWeight: 'bold' }}>
              {`Street`}
            </Typography>
          }
          secondary={`${order.street}`}
        />
        <ListItemText
          primary={
            <Typography variant="subtitle1" style={{ marginBottom: '8px', fontWeight: 'bold' }}>
              {`Order Status`}
            </Typography>
          }
          secondary={`${order.status}`}
        />
        <ListItemText
          primary={
            <Typography variant="subtitle1" style={{ marginBottom: '8px', fontWeight: 'bold' }}>
              {`Is Paid`}
            </Typography>
          }
          secondary={`${order.payStatus}`}
        />
        <ListItemText
          primary={
            <Typography variant="subtitle1" style={{ marginBottom: '8px', fontWeight: 'bold' }}>
              {`Date`}
            </Typography>
          }
          secondary={`${order.orderDate}`}
        />
        <IconButton
          edge="end"
          aria-label="details"
          onClick={() => handleDetailsClick(order)}
        >
          <InfoIcon />
        </IconButton>

        <OrderDetailsDialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            title="Order Details"
            data={selectOrder.uuid}
        />
      </ListItem>
    );
  };
  

  const handleDetailsClick = (order) => {
    setDialogOpen(true);
    setSelectOrder(order);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
      {orders.length === 0 ? (
        <Typography variant="body1">No orders found for this user.</Typography>
      ) : (
        <Paper elevation={3} style={{ width: '80%' }}>
          <FixedSizeList
            height={700}
            width="100%"
            itemSize={120}
            itemCount={orders.length}
          >
            {renderRow}
          </FixedSizeList>
        </Paper>
      )} 
    </div>
  );
};

export default ViewOrder;