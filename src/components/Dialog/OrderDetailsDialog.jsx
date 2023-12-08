import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import {
  IconButton,
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Collapse,
  Paper,
  TableContainer,
  DialogTitle
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import OrderService from '../../services/orderService';
import OrderProductService from '../../services/orderProductService';
import ProductService from '../../services/productService';


const CollapsibleTable = ({ order, orderDetails }) => {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
                <TableCell sx={{ textAlign: 'center', borderBottom: '1px solid #e0e0e0' }}>Order UUID</TableCell>
                <TableCell align="right" sx={{ textAlign: 'center', borderBottom: '1px solid #e0e0e0' }}>Customer</TableCell>
                <TableCell align="right" sx={{ textAlign: 'center', borderBottom: '1px solid #e0e0e0' }}>Street</TableCell>
                <TableCell align="right" sx={{ textAlign: 'center', borderBottom: '1px solid #e0e0e0' }}>Home</TableCell>
                <TableCell align="right" sx={{ textAlign: 'center', borderBottom: '1px solid #e0e0e0' }}>Delivery</TableCell>
                <TableCell align="right" sx={{ textAlign: 'center', borderBottom: '1px solid #e0e0e0' }}>Payment</TableCell>
                <TableCell align="right" sx={{ textAlign: 'center', borderBottom: '1px solid #e0e0e0' }}>Order Status</TableCell>
                <TableCell align="right" sx={{ textAlign: 'center', borderBottom: '1px solid #e0e0e0' }}>Order Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <Row order={order} orderDetails={orderDetails} />
          </TableBody>
        </Table>
      </TableContainer>
    );
  };


const Row = ({ order, orderDetails }) => {
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {order.uuid}
        </TableCell>
        <TableCell align="right" sx={{ textAlign: 'center' }}>{order.mail}</TableCell>
        <TableCell align="right" sx={{ textAlign: 'center' }}>{order.street}</TableCell>
        <TableCell align="right" sx={{ textAlign: 'center' }}>{order.home}</TableCell>
        <TableCell align="right" sx={{ textAlign: 'center' }}>{order.delivery}</TableCell>
        <TableCell align="right" sx={{ textAlign: 'center' }}>{order.payment}</TableCell>
        <TableCell align="right" sx={{ textAlign: 'center' }}>{order.status}</TableCell>
        <TableCell align="right" sx={{ textAlign: 'center' }}>{order.orderDate}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 20, paddingTop: 20 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
                Order Products 
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ backgroundColor: '#f2f2f2', fontWeight: 'bold' }}>
                        Product Title
                      </TableCell>
                      <TableCell sx={{ backgroundColor: '#f2f2f2', fontWeight: 'bold' }}>
                        Category
                      </TableCell>
                      <TableCell sx={{ backgroundColor: '#f2f2f2', fontWeight: 'bold' }}>
                        Platform
                      </TableCell>
                      <TableCell sx={{ backgroundColor: '#f2f2f2', fontWeight: 'bold' }}>
                        Format
                      </TableCell>
                      <TableCell sx={{ backgroundColor: '#f2f2f2', fontWeight: 'bold' }} align="right">
                        Quantity
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(orderDetails) &&
                      orderDetails.map((detail) => (
                        <TableRow key={detail.uuid}>
                          <TableCell>{detail.productTitle}</TableCell>
                          <TableCell>{detail.productCategory}</TableCell>
                          <TableCell>{detail.productPlatform}</TableCell>
                          <TableCell>{detail.productIsDigital ? 'Digital' : 'Physical'}</TableCell>
                          <TableCell align="right">{detail.quantity}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const OrderDetailsDialog = ({ open, onClose, title, data }) => {
    const [orderData, setOrderData] = useState({ orders: [] });
    const [orderDetailData, setOrderDetailData] = useState({orders: []})
    

    const fetchOrderData = async () => {
      try {
        const response = await OrderService.getOrder(data);
        setOrderData(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    const fetchOrderDetailsData = async () => {
      try {
        const response = await OrderProductService.getOrderProductByOrder(data);
        const orderDetailsWithProductData = await Promise.all(
          response.data.map(async (detail) => {
            try {
              const product = await ProductService.getProduct(detail.productUUID);
              return {
                ...detail,
                productTitle: product.data.title,
                productCategory: product.data.category,
                productPlatform: product.data.platform,
                productIsDigital: product.data.isDigital,
              };
            } catch (error) {
              console.error('Error fetching product details:', error);
              return detail;
            }
          })
        );
  
        setOrderDetailData(orderDetailsWithProductData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    useEffect(() => {
      if (open) {
        fetchOrderData();
        fetchOrderDetailsData();
      }
    }, [open]);
  
    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
        <DialogTitle>{title}</DialogTitle>
        {orderData && <CollapsibleTable order={orderData} orderDetails={orderDetailData} />}
      </Dialog>
    );
  };
  

export default OrderDetailsDialog;
