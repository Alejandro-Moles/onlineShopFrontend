
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Routers, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import SearchPage from './components/SearchPage/SearchPage';
import  Article  from './components/ArticlePage/Article';
import NavBar from './components/NavBar/NavBar';
import FloatingButton from "./components/FloatingButton/FloatingButton.jsx";
import DataPage from "./components/Data/DataPage.jsx"
import UserProfile from './components/Login/Profile.jsx';

function App() {
  return (
      <Routers>
          <NavBar/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/searchProducts" element={<SearchPage/>} />
            <Route path="/article/:uuid" element={<Article/>}/>
            <Route path='/dataPage' element={<DataPage/>}/>
            <Route path='/profile/:uuid' element={<UserProfile/>}/>
          </Routes>   
          <FloatingButton/>
      </Routers>
  )    
}

export default App
