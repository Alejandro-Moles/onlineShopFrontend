import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUserCircle, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import GamepadIcon from '@mui/icons-material/Gamepad';
import { Tooltip, Button, Menu, MenuItem } from '@mui/material';
import "./NavBar.css"
import CartService from '../../services/cartService';
import ShopUserService from '../../services/shopUserService';

export default function NavBar() {
    const [cartItems, setCartItems] = useState([]);
    const [user, setUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    const fetchCart = () => {
        CartService.getCart()
            .then(items => {
                setCartItems(items);
                console.log(items); 
            })
            .catch(error => console.error('Error al obtener el carrito', error));
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
    }, [])

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.href = '/';
    };


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-main fixed-top" id='my-navBar'>
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

                <div className="location">
                    <Tooltip title="Location" arrow>
                        <Link className="btn btn-link" to="/location">
                            <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" id='locationIcon'/>
                        </Link>
                    </Tooltip>
                </div>
                
                {user ? (
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
                <Link className="btn btn-link" onClick={fetchCart}>
                    <FontAwesomeIcon icon={faShoppingCart} size="lg" id='cartIcon'/>
                </Link>
            </Tooltip>
            </div>
        </nav>
    );
}
