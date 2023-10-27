
import { AppBar, Toolbar, Typography, Button, Tooltip, Input,InputAdornment, Grid } from '@mui/material';
import './NavBar.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import GamepadIcon from '@mui/icons-material/Gamepad';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function NavBar() {

  const [isOpen, setIsOpen] = useState(false);
  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className='body'>
        <header>
          <Link className="logo" to={"/"}>
            <GamepadIcon className="icon" fontSize="large"/>
            <span>Logo</span>
          </Link>
          <ul className={`navBar ${isOpen ? 'open' : ''}`}>
          <li>
            <Link to={"/searchProducts"}>
                <Tooltip title="Search Products" arrow>
                  <div className="navbar-button">
                    <SearchIcon />
                  </div>
              </Tooltip>
            </Link>
            </li>
            <li><Link className="active" to={"/"}>Home</Link></li>
            <li><Link to={"/"}>Location</Link></li>
            <li><Link to={"/"}>User Account</Link></li>
            <li>
              <Tooltip title="Shopping Cart" arrow>
                <Button color="inherit" className="navbar-button">
                  <ShoppingCartIcon />
                </Button>
              </Tooltip>
            </li>
          </ul>

          <div className="main">
            <Link to={"/login"} className="user"><i>Sign In</i></Link>
            <Link to={"/signup"}>Register</Link>
            <Button className="menu-button" onClick={handleButtonClick}>
              <MenuIcon id="menu-icon"/>  
            </Button>
          </div>
        </header>
    </div>
  );
}

export default NavBar;
