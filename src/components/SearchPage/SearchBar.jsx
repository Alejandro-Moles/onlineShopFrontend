import React, {useState, useEffect} from "react"
import "./css/SearchPage.css";
import SearchIcon from '@mui/icons-material/Search';
import ProductService from '../../services/productService';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Toolbar, Typography, Button, Tooltip, Input,InputAdornment, Grid } from '@mui/material';

function SearchBar({setResults, toggleFilterList}) {
    
    const [input, setInput] = useState("");
    const [selectedOption, setSelectedOption] = useState("");

    const fetchData =  async (value) => {
        try {
            const response = await ProductService.getAvaliableProducts();
            const json = response.data;
  
            const result = json.filter((products) => {
              return value && products && products.title && products.title.toLowerCase().includes(value.toLowerCase());
            });
            setResults(result);
            console.log(result);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
    }

    const handleChange = (value) => {
        setInput(value)
        fetchData(value)
    }

    const handleOptionChange = (e) => {
      setSelectedOption(e.target.value.toLowerCase());
      fetchData(input);
    };
    
    return (
        <div className="input-wrapper">
            <SearchIcon id="search-icon"/>
            <input placeholder="Type to search" 
            value={input} 
            onChange={(e) => handleChange(e.target.value)}/>
            <Tooltip title="Advanced Search" arrow>
              <Button className="Menubutton" onClick={toggleFilterList}>
                <MenuIcon className="MenuIcon"/>  
              </Button>
            </Tooltip>
        </div>
    )    
  }
  
  export default SearchBar