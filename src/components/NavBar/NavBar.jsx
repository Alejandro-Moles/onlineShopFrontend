import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUserCircle, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import GamepadIcon from '@mui/icons-material/Gamepad';
import { Tooltip, Button, Menu, MenuItem } from '@mui/material';
import "./NavBar.css"
import CartService from '../../services/cartService';
import ShopUserService from '../../services/shopUserService';
import AuthService from '../../services/authService';
import CartDialog from '../Dialog/CartDialog';
import CartLogic from '../../scripts/CartLogic';
import CustomAlert from '../AlertsMessage/CustomAlert';
import LocationDialog from '../Dialog/LocationDialog';
import UserAddressService from '../../services/userAddress';
import MakeOrderDialog from '../Dialog/MakeOrderDialog';

export default function NavBar() {
    const [cartItems, setCartItems] = useState([]);
    const [userAddresses, setUserAddresses] = useState([]);
    const [user, setUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    const [isCartDialogOpen, setCartDialogOpen] = useState(false);
    const [isLocationDialogOpen, setLocationDialogOpen] = useState(false);
    const [isMakeOrderDialogOpen, setIsMakeOrderDialogOpen] = useState(false);
 
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('info');

    const [selectedLocation, setSelectedLocation] = useState(null);

    const showAlert = (message, severity) => {
        setAlertMessage(message);
        setAlertSeverity(severity);
        setIsAlertOpen(true);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && !user) {
            ShopUserService.getActualShopUser(token)
                .then(response => {
                    setUser(response.data);
                })
                .catch(error => {
                    console.error('Error al cargar al usuario');
                })
        }
        fetchCart();
        getCart();
    }, [])

    const handleOpenCartDialog = () => {
        getCart();
        setCartDialogOpen(true);
    };
    
    const handleCloseCartDialog = () => {
        setCartDialogOpen(false);
    };

    const fetchCart = async () => {
        try {
            const items = await CartLogic.createCart();
            setCartItems(items);
        } catch (error) {
            console.error('Error al obtener el carrito', error);
        }
    };

    const getCart = async () => {
        try {
            const items = await CartLogic.getCartItems();
            setCartItems(items);
        } catch (error) {
            console.error('Error al obtener el carrito', error);
        }
    };

    const getUserAddress = async (uuid) => {
        try {
          const response = await UserAddressService.getUserAddressForUser(uuid);
          setUserAddresses(response.data);
        } catch (error) {
          console.error("Error fetching user addresses:", error);
        }
    };

    const handleRemoveItem = async (productUuid) => {
        try {
            let updatedCart = cartItems.filter(item => item.productUuid !== productUuid);
            setCartItems(updatedCart);
            CartService.updateCart(updatedCart);
    
            const removedItem = cartItems.find(item => item.productUuid === productUuid);
            if (removedItem) {
                await CartLogic.updateProductStock(productUuid, removedItem.quantity, true);
                showAlert("Product removed from cart", "success");
            } else {
                showAlert("Product removed from cart", "success");
            }
        } catch (error) {
            console.error("Error handling remove item:", error);
            showAlert("Error handling remove item", "error");
        }
    };
    
    const updateCartItems = (updatedCart) => {
        setCartItems(updatedCart);
        CartService.updateCart(updatedCart);
        showAlert("Product removed from cart", "success")
    };
        
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        AuthService.logOutUser();
        localStorage.removeItem('token')
        window.location.href = '/';
    };

    const handleOpenLocationDialog = () => {
        getUserAddress(user.uuid);
        setLocationDialogOpen(true);
    };
    
    const handleCloseLocationDialog = () => {
        setLocationDialogOpen(false);
    };

    const handleCloseOrderDialog = () => {
        setIsMakeOrderDialogOpen(false);
    };

    const handleLocationSelect = (location) => {
        setSelectedLocation(location);
    };

    const handlePurchase = () => {
        setIsMakeOrderDialogOpen(true);
    };

    const removeMultipleItems = async () => {
        let i = 0;
        let result = []; 
        for (const item of cartItems) {
            result.push(item.productUuid);
        }
        const filteredCartItems = cartItems.filter(item => !result.includes(item.productUuid));
        setCartItems(filteredCartItems);
        CartService.updateCart(filteredCartItems);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-main fixed-top" id='my-navBar'>
            <CustomAlert
                message={alertMessage}
                severity={alertSeverity}
                open={isAlertOpen}
                onClose={() => setIsAlertOpen(false)}
                autoHideDuration={2000}
            />
            <Link className="logo" to={"/"}>
                <GamepadIcon className="icon" fontSize="large"/>
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">
                            Home <span className="sr-only">(current)</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/searchProducts">
                            Products
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="d-flex">
                {user ? (
                <div className='user_content'>
                     {selectedLocation && (
                        <div className='location'>
                            <div className="locationInfo">
                                {user.name + " ( " + selectedLocation.street+ " " + selectedLocation.postalCode + " ) "}
                            </div>
                        </div>
                    )}
                    <div className="location">
                        <Tooltip title="Location" arrow>
                            <Link className="btn btn-link" onClick={handleOpenLocationDialog}>
                                <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" id='locationIcon'/>
                            </Link>
                        </Tooltip>
                    </div>
                     <div className="user_split_button">
                        <Tooltip title={`Welcome ${user ? user.name : ''}`} arrow>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleMenuOpen}
                            >
                                <div className="avatarWithLetter">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                            </Button>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem component={Link} to={`/profile/${user.uuid}`} onClick={handleMenuClose}>
                                Go to Profile
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
                ) : (
                    <Tooltip title="User Account" arrow>
                        <div className="user_png">
                            <Link className="btn btn-link" to="/login">
                                <FontAwesomeIcon icon={faUserCircle} size="lg" className="text-white" />
                            </Link>
                        </div>
                    </Tooltip>
                )}
            </div>

            <div className="cart">
            <Tooltip title="Shopping Cart" arrow>
                <Link className="btn btn-link" onClick={handleOpenCartDialog}>
                    <FontAwesomeIcon icon={faShoppingCart} size="lg" id='cartIcon'/>
                </Link>
            </Tooltip>

            <CartDialog
                open={isCartDialogOpen}
                onClose={handleCloseCartDialog}
                onPurchase={handlePurchase}
                cartItems={cartItems}
                onRemoveItem={handleRemoveItem}
                updateCartItems={updateCartItems}
                loggeduser={user}
                location={selectedLocation}
            />

            <LocationDialog
                open={isLocationDialogOpen}
                onClose={handleCloseLocationDialog}
                userAddress={userAddresses}
                user={user}
                onSelect={handleLocationSelect}
            />

            <MakeOrderDialog
                open={isMakeOrderDialogOpen}
                handleClose={handleCloseOrderDialog}
                user={user}
                address={selectedLocation}
                cartItems={cartItems}
                clearCart={removeMultipleItems}
            />
            </div>
        </nav>
    );
}
