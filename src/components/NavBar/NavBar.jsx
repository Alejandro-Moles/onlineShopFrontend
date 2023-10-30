import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUserCircle, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import GamepadIcon from '@mui/icons-material/Gamepad';
import { Tooltip } from '@mui/material';
import "./NavBar.css"

export default function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-main fixed-top" id='my-navBar'>
            <Link className="logo" to={"/"}>
                <GamepadIcon className="icon" fontSize="large"/>
            </Link>

            {/* Navbar Toggler Button for Small Screens */}
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
                
                <Tooltip title="User Account" arrow>
                <div className="user_png">
                    <Link className="btn btn-link" to="/login">
                        <FontAwesomeIcon icon={faUserCircle} size="lg" className="text-white" />
                    </Link>
                </div>
                </Tooltip>
            </div>

            <div className="cart">
            <Tooltip title="Shopping Cart" arrow>
                <Link className="btn btn-link" to="/">
                    <FontAwesomeIcon icon={faShoppingCart} size="lg" id='cartIcon'/>
                </Link>
            </Tooltip>
            </div>
        </nav>
    );
}
