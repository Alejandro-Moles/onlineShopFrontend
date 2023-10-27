
import './App.css'
import NavBar from './components/NavBar/NavBar';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Routers, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import SearchPage from './components/SearchPage/SearchPage';

function App() {
  return (
      <Routers>
          <NavBar/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/searchProducts" element={<SearchPage/>} />
          </Routes>    
      </Routers>
  )    
}

export default App
