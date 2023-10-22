
import { AppBar, Toolbar, Typography, Button, Tooltip, Input,InputAdornment, Grid } from '@mui/material';
import './NavBar.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import GamepadIcon from '@mui/icons-material/Gamepad';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useEffect, useState } from 'react';

function NavBar() {

  const [isOpen, setIsOpen] = useState(false);
  const handleButtonClick = () => {
    console.log("A")
    setIsOpen(!isOpen);
  }

  return (
    <div className='body'>
        <header>
          <a href="#" className="logo">
            <GamepadIcon className="icon" fontSize="large"/>
            <span>Logo</span>
          </a>
          <ul className={`navBar ${isOpen ? 'open' : ''}`}>
          <li>
              <Tooltip title="Search Product" arrow>
                <Button color="inherit" className="navbar-button">
                  <SearchIcon />
                </Button>
              </Tooltip>
            </li>
            <li><a href="#" className="active">Home</a></li>
            <li><a href="#">Location</a></li>
            <li><a href="#">User Account</a></li>
            <li>
              <Tooltip title="Shopping Cart" arrow>
                <Button color="inherit" className="navbar-button">
                  <ShoppingCartIcon />
                </Button>
              </Tooltip>
            </li>
          </ul>

          <div className="main">
            <a href="#" className="user"><i>Sign In</i></a>
            <a href="#">Register</a>
            <Button className="menu-button" onClick={handleButtonClick}>
              <MenuIcon id="menu-icon"/>  
            </Button>
          </div>
        </header>
    </div>
  );
}

export default NavBar;
