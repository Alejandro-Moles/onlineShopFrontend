import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Select, MenuItem, Grid, FormControl, InputLabel} from '@mui/material';
import "./css/OrderPage.css";
import OrderService from '../../services/orderService';
import { DataGrid } from '@mui/x-data-grid';
import { Fab } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../scripts/Theme';
import OrderDetailsDialog from '../Dialog/OrderDetailsDialog';
import OrderStatusService from '../../services/orderStatusService';
import CustomAlert from '../AlertsMessage/CustomAlert';
import ShopUserService from '../../services/shopUserService';

const OrdersPage = () => {
    const [input, setInput] = useState("");
    const [orders, setOrders] = useState([]);
    const [selectionModel, setSelectionModel] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [orderStatus, setOrderStatus] = useState([]);

    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('info');

    const [isEmployee, setIsEmployee] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            ShopUserService.getActualShopUser(token)
                .then(response => {
                    setIsEmployee(response.data.roles.includes('EMPLOYEE'));
                })
                .catch(error => {
                    console.error('Error al cargar al usuario');
                })
        }
    }, []);

    const [formData, setFormData] = useState({
        orderStatus: '',
    });

    const showAlert = (message, severity) => {
        setAlertMessage(message);
        setAlertSeverity(severity);
        setIsAlertOpen(true);
    };

    const [open, setOpen] = useState(false);

    const fetchStatus = async () => {
        try {
            const response = await OrderStatusService.getStatus();
            setOrderStatus(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching order:', error);
        }
    }

    const fetchOrders = async () => {
        try {
            const response = await OrderService.getOrders();
            const json = response.data;
            const filteredOrders = json.filter(order => order.mail === input);
            setOrders(filteredOrders);
        } catch (error) {
            console.error('Error fetching order:', error);
        }
    }

    const handleDetailsClick = () => {
        setDialogOpen(true);
    };

    const columns = [
        { field: 'uuid', headerName: 'UUID', flex: 1 },
        { field: 'street', headerName: 'Street', flex: 1 },
        { field: 'status', headerName: 'Order Status', flex: 1 },
        { field: 'payStatus', headerName: 'Is Paid', flex: 1 },
        { field: 'orderDate', headerName: 'Order Date', flex: 1 },
    ];

    const fetchData = async () => {
        fetchOrders();
        fetchStatus();
    }

    const handleButtonClick = () => {
        fetchData();
    };

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (field) => (event) => {
        setFormData({ ...formData, [field]: event.target.value });
    };

    const renderSelect = (options) => (
        options.length > 0 ? (
        <FormControl fullWidth>
            <InputLabel>Order Status</InputLabel>
            <Select
                value={formData.orderStatus}
                onChange={handleChange('orderStatus')}
                label="Order Status"
                variant="outlined"
            >
                {options.map((status) => (
                <MenuItem key={status.uuid} value={status.type}>
                    {status.type}
                </MenuItem>
                ))}
            </Select>
        </FormControl>
        ) : null
    );

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isAnyFieldEmpty = Object.values(formData).some((value) => value === '');

        if (isAnyFieldEmpty) {
            showAlert("You have to fill in all the fields", "error")
            return;
        }

        try{
            await OrderService.updateOrder(selectionModel, formData.orderStatus);
            showAlert("Address successfully created", "success")
            window.location.reload();
        } catch (error){
            console.error('Error', error)
        }
    };

    if (!isEmployee) {
        return null;
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="container">
                <div className="textFieldWrapper">
                    <TextField
                        placeholder="User Mail"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleButtonClick}
                                    >
                                        Search
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                        className="customTextField"
                    />
                </div>
                {orders.length > 0 && (
                    <div style={{ height: 400, width: '100%' }}>
                        <div>
                            <DataGrid
                                rows={orders}
                                columns={columns}
                                pageSize={5}
                                checkboxSelection
                                getRowId={(row) => row.uuid}
                                onRowSelectionModelChange={(newSelection) => {
                                    setSelectionModel(newSelection);
                                }}
                                className='tableContainer'
                            />
                        </div>

                        <div className="floating-buttons">
                            <Fab
                                className='floatButton'
                                color="primary"
                                aria-label="Edit"
                                disabled={selectionModel.length !== 1}
                                onClick={handleOpen}
                            >
                                <EditIcon />
                            </Fab>

                            <Fab
                                className='floatButton'
                                color="secondary"
                                aria-label="Details"
                                onClick={handleDetailsClick}
                                disabled={selectionModel.length !== 1}
                            >
                                <InfoIcon />
                            </Fab>
                        </div>
                    </div>
                )}
                 <OrderDetailsDialog
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    title="Detalles del Pedido"
                    data={selectionModel}
                />
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Order Status</DialogTitle>
                    <DialogContent>
                        <form className='formStatus' onSubmit={handleSubmit}>
                            {renderSelect(orderStatus)}
                            <div className='formButton'>
                                <Button type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
                <CustomAlert
                    message={alertMessage}
                    severity={alertSeverity}
                    open={isAlertOpen}
                    onClose={() => setIsAlertOpen(false)}
                    autoHideDuration={2000}
                />
            </div>
        </ThemeProvider>
    );
};

export default OrdersPage;